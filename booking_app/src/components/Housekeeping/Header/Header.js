import React from 'react'
import styles from "./Header.module.css"
import {Button} from "@mui/material"

const Header = () => {
  return (
    <div className={styles['flex-box']}>
      <p id={styles.t1}>House|keeping</p>
      <p id={styles.t2} color="secondary">Your satisfaction is our no.1 priority</p>
      <div id={styles.aestheticbox}></div>
      <div className="dumb box don't delete this" style={{flexGrow:1}}></div>
    </div>
  )
}

export default Header