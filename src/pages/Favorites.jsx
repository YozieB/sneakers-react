import Catalog from '../components/Catalog/Catalog'
import Card from '../components/Card/Card'
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import FakeCard from '../components/Card/FakeCard'
import Info from '../components/Info/Info'
import emptyFavorites from '../images/fav-empty.jpg'
import styles from '../components/App.module.scss'
export default function Favorites({
  onAddFavorite,
  handleAddButtonClick,
  isLoaded,
}) {
  const { favorites } = useContext(AppContext)
  return (
    <>
        <div className={styles.header}>
        <h1 className={styles.title}>Мои закладки</h1>
      </div>
      <Catalog>
        {favorites.length > 0 ? (
          isLoaded ? (
            <>
              {favorites.map(el => (
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
          )
        ) : (
          <Info
            title='Закладок нет :('
            description='Вы ничего не добавляли в закладки'
            image={emptyFavorites}
            hasButton={false}
          />
        )}
      </Catalog>
    </>
  )
}
