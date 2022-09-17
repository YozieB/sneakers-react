import React, { useContext } from 'react'
import Catalog from '../components/Catalog/Catalog'
import Card from '../components/Card/Card'
import FakeCard from '../components/Card/FakeCard'
import AppContext from '../context/AppContext'
import Search from '../components/Search/Search'
import styles from '../components/App.module.scss'
export default function Home({
  searchValue,
  onChangeSearchInput,
  onAddFavorite,
  handleAddButtonClick,
  isLoaded,
}) {
  const { items } = useContext(AppContext)
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}
        </h1>
        <Search
          searchValue={searchValue}
          onChangeSearchInput={onChangeSearchInput}
        />
      </div>
      <Catalog>
        {isLoaded ? (
          <>
            {items
              .filter(item =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map(el => (
                <Card
                  key={el.image}
                  id={el.id}
                  parentId={el.parentId}
                  handleFavoriteClick={onAddFavorite}
                  handleAddButtonClick={handleAddButtonClick}
                  {...el}
                />
              ))}
          </>
        ) : (
          <>
            {[...Array(10)].map((el, i) => (
              <FakeCard key={i} />
            ))}
          </>
        )}
      </Catalog>
    </>
  )
}
