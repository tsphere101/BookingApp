import React from 'react'
import styles from "./Header.module.css"
import {Button} from "@mui/material"

const Header = () => {
  return (
    <div className={styles['flex-box']}>
      <p id={styles.t1}>House|keeping</p>
      <a href='/' id={styles.t2} color="secondary">Learn how to use</a>
      <div className="dumb box don't delete this" style={{flexGrow:1}}></div>
      <Button variant='contained' sx={{mr:1, maxWidth:3,height:40,mt:1.1}}>Print</Button>
      <Button variant='contained' sx={{height:40,mt:1.1}}>Export to</Button>
    </div>
  )
}

export default Header