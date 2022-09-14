import { useRef, useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Favorites from './pages/Favorites'
import Header from './components/Header/Header'
import Cart from './components/Cart/Cart'
import Overlay from './components/Overlay/Overlay'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const [cartOpened, setCartOpened] = useState(false)
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState([])

  // getting ref for outside click close
  const overlayRef = useRef()
  function handleCartOpen() {
    setCartOpened(true)
  }
  function handleCartClose(e) {
    if (e.target === overlayRef.current) {
      setCartOpened(false)
    }
  }
  function handleAddButtonClick(obj) {
    axios
      .post('https://6321c35882f8687273b88471.mockapi.io/cart', obj)
      .then(el => {
        setCartItems(prev => [...prev, el.data])
      })
  }

  function handleRemoveItem(id) {
    axios
      .delete(`https://6321c35882f8687273b88471.mockapi.io/cart/${id}`)
      .then(() => {
        setCartItems(prev => prev.filter(item => item.id !== id))
      })
      .catch(error => console.log(`Ошибка: ${error}`))
  }
  function onChangeSearchInput(e) {
    setSearchValue(e.target.value)
  }

  function onAddFavorite(obj) {
    if (favorites.find(favObj => favObj.id === obj.id)) {
      axios
        .delete(
          `https://6321c35882f8687273b88471.mockapi.io/favorites/${obj.id}`
        )
        .then(() => {
          setFavorites(prev => prev.filter(item => item.id !== obj.id))
        })
        .catch(error => console.log(`Ошибка: ${error}`))
    } else {
      axios
        .post('https://6321c35882f8687273b88471.mockapi.io/favorites', obj)
        .then(el => {
          setFavorites(prev => [...prev, el.data])
        })
        .catch(error => console.log(`Ошибка: ${error}`))
    }
  }
  useEffect(() => {
    axios
      .get('https://6321c35882f8687273b88471.mockapi.io/items')
      .then(res => setItems(res.data))
      .catch(error => console.log(`Ошибка: ${error}`))
    axios
      .get('https://6321c35882f8687273b88471.mockapi.io/cart')
      .then(res => setCartItems(res.data))
      .catch(error => console.log(`Ошибка: ${error}`))
    axios
      .get('https://6321c35882f8687273b88471.mockapi.io/favorites')
      .then(res => setFavorites(res.data))
      .catch(error => console.log(`Ошибка: ${error}`))
  }, [])
  return (
    <div className='page'>
      <Header onCartOpen={handleCartOpen} />
      <Routes>
        <Route
          path='/favorites'
          element={
            <Favorites items={favorites} onAddFavorite={onAddFavorite} />
          }
        />
        <Route
          path='/'
          element={
            <Home
              items={items}
              searchValue={searchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddFavorite={onAddFavorite}
              handleAddButtonClick={handleAddButtonClick}
            />
          }
        />
      </Routes>

      {cartOpened && (
        <Overlay onCartClose={handleCartClose} onRef={overlayRef}>
          <Cart
            onCartClose={() => setCartOpened(false)}
            items={cartItems}
            onRemove={handleRemoveItem}
          />
        </Overlay>
      )}
    </div>
  )
}

export default App
