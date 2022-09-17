import styles from './Info.module.scss'
export default function Info({
  onCartClose,
  title,
  image,
  description,
  hasButton,
}) {
  return (
    <div className={styles.empty}>
      <img className={styles.emptyImg} src={image} alt='Заказ' />
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyText}>{description}</p>
      {hasButton && (
        <button onClick={onCartClose} className={styles.menuBtn}>
          К покупкам
        </button>
      )}
    </div>
  )
}
