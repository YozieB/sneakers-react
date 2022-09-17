import styles from './Card.module.scss'
import heartUnliked from '../../images/heart-unliked.svg'
import heartLiked from '../../images/heart-liked.svg'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
export default function Card({
  id,
  title,
  price,
  image,
  handleAddButtonClick,
  handleFavoriteClick,
  parentId,
}) {
  const { handleItemAdded, handleFavoriteAdded, getPrice } =
    useContext(AppContext)
  function addButtonClick() {
    handleAddButtonClick({
      id,
      title,
      price,
      image,
      parentId,
    })
  }
  function favoriteButtonClick() {
    handleFavoriteClick({
      id,
      title,
      price,
      image,
      parentId,
    })
  }
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={favoriteButtonClick}
          src={handleFavoriteAdded(parentId) ? heartLiked : heartUnliked}
          alt='лайк'
        />
      </div>
      <img src={image} alt='Кроссовки' className={styles.image} />
      <p className={styles.title}>{title}</p>
      <div className={styles.info}>
        <div className={styles.price}>
          <span className={styles.priceText}>Цена:</span>
          <b className={styles.priceValue}>{getPrice(price)} руб.</b>
        </div>
        <button
          className={
            handleItemAdded(parentId)
              ? styles.btn + ' ' + styles['btn_checked']
              : styles.btn
          }
          onClick={addButtonClick}
        ></button>
      </div>
    </div>
  )
}
