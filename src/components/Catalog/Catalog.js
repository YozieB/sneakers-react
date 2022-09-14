import React from 'react'
import styles from './Catalog.module.scss'
export default function Catalog({ children }) {
  return <div className={styles.catalog}>{children}</div>
}
