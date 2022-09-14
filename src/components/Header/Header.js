import logoPath from '../../images/logo.png'
import cartPath from '../../images/cart.svg'
import userPath from '../../images/user.svg'
import favoritePath from '../../images/favorite.svg'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
export default function Header({ onCartOpen }) {
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
          <img src={cartPath} alt='Корзина' />
          <span className={styles.price}>1205 руб.</span>
        </li>
        <li className={styles.listItem}>
          <Link className={styles.listLink} to='/favorites'>
            <img src={favoritePath} alt='Избранное' />
          </Link>
        </li>
        <li className={styles.listItem}>
          <img src={userPath} alt='Пользователь' />
        </li>
      </ul>
    </header>
  )
}
