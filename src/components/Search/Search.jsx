import searchPath from '../../images/search.svg'
import styles from './Search.module.scss'
export default function Search({ searchValue, onChangeSearchInput }) {
  return (
    <div className={styles.search}>
      <img className={styles.image} src={searchPath} alt='Поиск' />
      <input
        onChange={onChangeSearchInput}
        className={styles.input}
        placeholder='Поиск...'
        value={searchValue}
      ></input>
    </div>
  )
}
