import React from "react";
import styles from "./Navbar.module.css";
import BedIcon from "@mui/icons-material/Bed";
import { useState } from "react";
import {Button} from "@mui/material"

const Navbar = () => {
  const [page, setPage] = useState(1);

  console.log(page);

  return (
    <div id={styles.nav}>
      <div className={styles.item}>
        <span className={styles.icon}>
          <BedIcon />
        </span>
        <Button variant={page===1 ? 'contained':'text'} color="success" sx={{borderRadius:0}} onClick={()=>setPage(1)}>Home</Button>
        <Button variant={page===2 ? 'contained':'text'} color="success" sx={{borderRadius:0}} onClick={()=>setPage(2)}>Something</Button>
      </div>
      <div className="dumb box don't delete this" style={{ flexGrow: 1 }}></div>
      <Button variant='contained' color="success" sx={{borderRadius:0}}>Login</Button>
    </div>
  );
};

export default Navbar;
