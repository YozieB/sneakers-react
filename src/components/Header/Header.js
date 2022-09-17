import logoPath from '../../images/logo.png'
import cartPath from '../../images/cart.svg'
import favoritePath from '../../images/favorite.svg'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
export default function Header({ onCartOpen, totalCount }) {
  const { getTotalPrice, getPrice } = useContext(AppContext)
  return (
    <header className={styles.header}>
      <Link className={styles.link} to='/'>
        <div className={styles.info}>
          <img className={styles.image} src={logoPath} alt='Лого' />
          <div>
            <h3 className={styles.title}>Sneakers React</h3>
            <p className={styles.subtitle}>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className={styles.list}>
        <li className={styles.listItem} onClick={onCartOpen}>
          <picture
            className={totalCount > 0 ? styles.cartIconCount : styles.cartIcon}
            data-count={totalCount}
          >
            <img className={styles.cartIcon} src={cartPath} alt='Корзина' />
          </picture>
          <span className={styles.price}>
            {getPrice(getTotalPrice()) + ' '}
            руб.
          </span>
        </li>
        <li className={styles.listItem}>
          <Link className={styles.listLink} to='/favorites'>
            <img src={favoritePath} alt='Избранное' />
          </Link>
        </li>
      </ul>
    </header>
  )
}
