import Catalog from '../components/Catalog/Catalog'
import Card from '../components/Card/Card'
export default function Favorites({ items, onAddFavorite }) {
  return (
    <>
      <div className='page__header'>
        <h1 className='page__title'>
          {/* {searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'} */}
          Мои закладки
        </h1>
      </div>
      <Catalog>
        {items.map(el => (
          <Card
            key={el.image}
            //   title={el.title}
            //  price={el.price}
            //  image={el.image}
            liked={true}
            handleFavoriteClick={onAddFavorite}
            {...el}
            //  handleAddButtonClick={handleAddButtonClick}
          />
        ))}
      </Catalog>
    </>
  )
}
