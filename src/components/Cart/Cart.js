import { useState, useContext } from 'react'
import removeBtnPath from '../../images/cart-btn-remove.svg'
import emptyCartPath from '../../images/cart-empty.jpg'
import styles from './Cart.module.scss'
import Info from '../Info/Info'
import AppContext from '../../context/AppContext'
import orderCartPath from '../../images/cart-order.jpg'
import axios from 'axios'
export default function Cart({
  items = [],
  onRemove,
  onCartClose,
  isOrderLoading,
  setIsOrderLoading,
  cartOpened,
}) {
  const [order, setOrder] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  async function onClickOrderBtn() {
    try {
      setIsOrderLoading(true)
      const { data } = await axios.post(
        `https://6321c35882f8687273b88471.mockapi.io/orders`,
        {
          orderInfo: cartItems,
        }
      )
      setOrderId(data.id)
      // Костыль для бэка, т.к. mockapi не дает очистить массив одним запросом PUT
      for (let i = 0; i <= cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(
          `https://6321c35882f8687273b88471.mockapi.io/cart/${item.id}`
        )
        await delay(300)
      }
    } catch (error) {
      console.log(`Ошибка: ${error}`)
    }
    setOrder(true)
    setCartItems([])
    setIsOrderLoading(false)
  }
  const { cartItems, setCartItems, getTotalPrice, totalPrice, getPrice } =
    useContext(AppContext)
  return (
    <div
      className={
        cartOpened ? styles.cart : styles.cart + ' ' + styles.cartHidden
      }
    >
      <h2 className={styles.title}>Корзина</h2>
      {items.length > 0 ? (
        <>
          <ul className={styles.list}>
            {items.map(el => (
              <li key={el.parentId} className={styles.item}>
                <img
                  className={styles.itemImage}
                  src={el.image}
                  alt='Кроссовки'
                />
                <div>
                  <p className={styles.itemTitle}>{el.title}</p>
                  <b className={styles.itemPrice}>{getPrice(el.price)} руб.</b>
                </div>
                <img
                  onClick={() => {
                    onRemove(el.id)
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
              <b className={styles.menuPrice}>
                {getPrice(getTotalPrice())} руб.{' '}
              </b>
            </div>
            <div className={styles.menuItem}>
              <div className={styles.menuTitle}>Налог 5%:</div>
              <div className={styles.menuGap}></div>
              <b className={styles.menuPrice}>
                {Math.round((totalPrice / 100) * 5)} руб.
              </b>
            </div>
            <button
              disabled={isOrderLoading}
              onClick={onClickOrderBtn}
              className={styles.menuBtn}
            >
              {isOrderLoading ? 'Отправка данных...' : 'Оформить заказ'}
            </button>
          </div>
        </>
      ) : (
        <Info
          title={order ? 'Заказ оформлен!' : 'Корзина пустая'}
          description={
            order
              ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
              : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
          }
          image={order ? orderCartPath : emptyCartPath}
          onCartClose={onCartClose}
          hasButton={true}
        />
      )}
    </div>
  )
}
