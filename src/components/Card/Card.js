import styles from './Card.module.scss'
import React from 'react'
import heartUnliked from '../../images/heart-unliked.svg'
import heartLiked from '../../images/heart-liked.svg'
import { useState } from 'react'
export default function Card({
  id,
  title,
  price,
  image,
  handleAddButtonClick,
  handleFavoriteClick,
  liked = false,
}) {
  const [isAdded, setIsAdded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(liked)
  function addButtonClick() {
    handleAddButtonClick({ title, price, image })
    setIsAdded(!isAdded)
  }
  function favoriteButtonClick() {
    handleFavoriteClick({ id, title, price, image })
    setIsFavorite(!isFavorite)
  }
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={favoriteButtonClick}
          src={isFavorite ? heartLiked : heartUnliked}
          alt='лайк'
        />
      </div>
      <img src={image} alt='Кроссовки' className={styles.image} />
      <p className={styles.title}>{title}</p>
      <div className={styles.info}>
        <div className={styles.price}>
          <span className={styles.priceText}>Цена:</span>
          <b className={styles.priceValue}>{price} руб.</b>
        </div>
        <button
          className={
            isAdded ? styles.btn + ' ' + styles['btn_checked'] : styles.btn
          }
          onClick={addButtonClick}
        ></button>
      </div>
    </div>
  )
}
