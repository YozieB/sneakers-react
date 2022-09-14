import React from 'react'
import Catalog from '../components/Catalog/Catalog'
import Card from '../components/Card/Card'
import searchPath from '../images/search.svg'
export default function Home({
  items,
  searchValue,
  onChangeSearchInput,
  onAddFavorite,
  handleAddButtonClick,
}) {
  return (
    <>
      <div className='page__header'>
        <h1 className='page__title'>
          {searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}
        </h1>
        <div className='search'>
          <img className='search__image' src={searchPath} alt='Поиск' />
          <input
            onChange={onChangeSearchInput}
            className='search__input'
            placeholder='Поиск...'
            value={searchValue}
          ></input>
        </div>
      </div>
      <Catalog>
        {items
          .filter(item => item.title.toLowerCase().includes(searchValue))
          .map(el => (
            <Card
              key={el.image}
              //title={el.title}
              //price={el.price}
              //image={el.imageUrl}
              handleFavoriteClick={onAddFavorite}
              handleAddButtonClick={handleAddButtonClick}
              {...el}
            />
          ))}
      </Catalog>
    </>
  )
}
