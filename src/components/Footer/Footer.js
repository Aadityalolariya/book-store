import React from 'react'
import styles from './Footer.module.css'
export default function Footer() {
  return (
    <>
        <div className={styles.container}>
            <ul className={styles.list}>
                <li><a href = '/'>Home</a></li>
                <li><a href = '/'>Sign In</a></li>
                <li><a href = '/'>Sign Up</a></li>
            </ul>
            <ul className={styles.list}>
                <li><a href = '/cart'>Cart</a></li>
                <li><a href = '/'>Products</a></li>
                <li><a href = '/'>Services</a></li>
            </ul>
            <ul className={styles.list}>
                <li><a href = '/'>Contact Us</a></li>
                <li><a href = '/'>Feedback</a></li>
                <li><a href = '/'>Help</a></li>
            </ul>
        </div>
    </>
  )
}
