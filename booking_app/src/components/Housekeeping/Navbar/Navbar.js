import React from "react";
import styles from "./Navbar.module.css";
import BedIcon from "@mui/icons-material/Bed";
import { useState } from "react";
import RadioButton from "../Reuseable/RadioButton";
import { style } from "@mui/system";

const Navbar = () => {
  const [page, setPage] = useState('home');

  console.log(page);

  return (
    <div id={styles.nav}>
      <div className={styles.item}>
        <div className={styles.icon}>
          <BedIcon style={{ color: "#fff" }} />
        </div>

        <RadioButton title='home' group='nav' current={page} onClick={setPage}/>
        <RadioButton title='someth1' group='nav' current={page} onClick={setPage}/>
        <RadioButton title='someth2' group='nav' current={page} onClick={setPage}/>

      </div>
      <div className="dumb box don't delete this" style={{ flexGrow: 1 }}></div>
    </div>
  );
};

export default Navbar;
