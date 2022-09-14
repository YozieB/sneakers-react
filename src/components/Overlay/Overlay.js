import React from 'react'
import styles from './Overlay.module.scss'
export default function Overlay({ children, onCartClose, onRef }) {
  return (
    <div onClick={onCartClose} className={styles.overlay} ref={onRef}>
      {children}
    </div>
  )
}
