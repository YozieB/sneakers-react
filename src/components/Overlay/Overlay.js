import React from 'react'
import styles from './Overlay.module.scss'
export default function Overlay({ children, onCartClose, onRef, cartOpened }) {
  return (
    <div
      onClick={onCartClose}
      className={
        cartOpened
          ? styles.overlay
          : styles.overlay + ' ' + styles.overlayHidden
      }
      ref={onRef}
    >
      {children}
    </div>
  )
}
