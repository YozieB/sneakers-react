import { useRef, useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Favorites from './pages/Favorites'
import Header from './components/Header/Header'
import Cart from './components/Cart/Cart'
import Overlay from './components/Overlay/Overlay'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AppContext from './context/AppContext'

function App() {
  const [cartOpened, setCartOpened] = useState(false)
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOrderLoading, setIsOrderLoading] = useState(false)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)
  const totalCount = cartItems.length
  const totalFavoritesCount = favorites.length
  // prevent scrolling if cart opened
  useEffect(() => {
    cartOpened
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }, [cartOpened])
  // making price output beautiful
  function getPrice(amount) {
    amount = String(amount).split('')
    switch (amount.length) {
      case 7:
        amount[3] = amount[3] + ' '
        amount[0] = amount[0] + ' '
        break
      case 6:
        amount[2] = amount[2] + ' '
        break
      case 5:
        amount[1] = amount[1] + ' '
        break
      case 4:
        amount[0] = amount[0] + ' '
        break
      default:
        break
    }

    return amount.join('')
  }

  // calculating price for header / cart
  function getTotalPrice() {
    return cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0)
  }

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
    console.log(obj)
    const findItem = cartItems.find(
      cartObj => Number(cartObj.parentId) === Number(obj.parentId)
    )
    console.log(findItem)
    if (findItem) {
      axios
        .delete(
          `https://6321c35882f8687273b88471.mockapi.io/cart/${findItem.id}`
        )
        .then(() => {
          setCartItems(prev =>
            prev.filter(item => Number(item.parentId) !== Number(obj.parentId))
          )
        })
        .catch(error => console.log(`Ошибка: ${error}`))
    } else {
      axios
        .post('https://6321c35882f8687273b88471.mockapi.io/cart', obj)
        .then(el => {
          setCartItems(prev => [...prev, el.data])
        })
        .catch(error => console.log(`Ошибка: ${error}`))
    }
  }
  function onAddFavorite(obj) {
    console.log(obj)
    const findItem = favorites.find(
      cartObj => Number(cartObj.parentId) === Number(obj.parentId)
    )
    if (findItem) {
      axios
        .delete(
          `https://6321c35882f8687273b88471.mockapi.io/favorites/${findItem.id}`
        )
        .then(() => {
          setFavorites(prev =>
            prev.filter(item => Number(item.parentId) !== Number(obj.parentId))
          )
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

  const handleItemAdded = id => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  const handleFavoriteAdded = id => {
    return favorites.some(obj => Number(obj.parentId) === Number(id))
  }
  useEffect(() => {
    Promise.all([
      axios.get('https://6321c35882f8687273b88471.mockapi.io/cart'),
      axios.get('https://6321c35882f8687273b88471.mockapi.io/favorites'),
      axios.get('https://6321c35882f8687273b88471.mockapi.io/items'),
    ]).then(([cart, favorites, items]) => {
      setCartItems(cart.data)
      setFavorites(favorites.data)
      setItems(items.data)
      setIsLoaded(true)
    })
  }, [])
  return (
    <div className='page'>
      <AppContext.Provider
        value={{
          cartItems,
          favorites,
          items,
          handleItemAdded,
          handleFavoriteAdded,
          setCartItems,
          totalPrice,
          getTotalPrice,
          getPrice,
        }}
      >
        <Header
          onCartOpen={handleCartOpen}
          totalCount={totalCount}
          totalFavoritesCount={totalFavoritesCount}
        />
        <Routes>
          <Route
            path='/favorites'
            element={
              <Favorites
                onAddFavorite={onAddFavorite}
                handleAddButtonClick={handleAddButtonClick}
                isLoaded={isLoaded}
              />
            }
          />
          <Route
            path='/'
            element={
              <Home
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddFavorite={onAddFavorite}
                handleAddButtonClick={handleAddButtonClick}
                isLoaded={isLoaded}
              />
            }
          />
        </Routes>

        <Overlay
          onCartClose={isOrderLoading ? null : handleCartClose}
          onRef={overlayRef}
          cartOpened={cartOpened}
        >
          <Cart
            onCartClose={() => setCartOpened(false)}
            items={cartItems}
            onRemove={handleRemoveItem}
            isOrderLoading={isOrderLoading}
            setIsOrderLoading={setIsOrderLoading}
            totalPrice={totalPrice}
            getTotalPrice={getTotalPrice}
            cartOpened={cartOpened}
          />
        </Overlay>
      </AppContext.Provider>
    </div>
  )
}

export default App
