import React from 'react'
import removeBtnPath from '../../images/cart-btn-remove.svg'
import emptyCartPath from '../../images/cart-empty.jpg'
import styles from './Cart.module.scss'
export default function Cart({ items = [], onRemove, onCartClose }) {
  return (
    <div className={styles.cart}>
      <h2 className={styles.title}>Корзина</h2>
      {items.length > 0 ? (
        <>
          <ul className={styles.list}>
            {items.map(el => (
              <li key={el.id} className={styles.item}>
                <img
                  className={styles.itemImage}
                  src={el.image}
                  alt='Кроссовки'
                />
                <div>
                  <p className={styles.itemTitle}>{el.title}</p>
                  <b className={styles.itemPrice}>{el.price} руб.</b>
                </div>
                <img
                  onClick={() => {
                    onRemove(el.id)
                    console.log(el)
                  }}
                  src={removeBtnPath}
                  className={styles.removeItemBtn}
                  alt='Удалить'
                />
              </li>
            ))}
          </ul>
          <div className={styles.menu}>
            <div className={styles.menuItem}>
              <div className={styles.menuTitle}>Итого:</div>
              <div className={styles.menuGap}></div>
              <b className={styles.menuPrice}>21 498 руб. </b>
            </div>
            <div className={styles.menuItem}>
              <div className={styles.menuTitle}>Налог 5%:</div>
              <div className={styles.menuGap}></div>
              <b className={styles.menuPrice}>1074 руб. </b>
            </div>
            <button className={styles.menuBtn}>Оформить заказ</button>
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <img
            className={styles.emptyImg}
            src={emptyCartPath}
            alt='Пустая корзина'
          />
          <h3 className={styles.emptyTitle}>Корзина пустая</h3>
          <p className={styles.emptyText}>
            Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
          </p>
          <button onClick={onCartClose} className={styles.menuBtn}>
            Вернуться назад
          </button>
        </div>
      )}
    </div>
  )
}
