import React from "react";
import styles from "./Modebar.module.css";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState } from "react";
import { style } from "@mui/system";

const Modebar = () => {
  const [mode, setMode] = useState(1);

  return (
    <div
      className={styles["container"]}
      style={{ borderBottom: "1px solid black" }}
    >
      <div className={styles.modebar}>
        <input type="radio" id="Inspection" value="Inspection" name="mode" checked={mode === 1} onClick={()=>setMode(1)}/><label className={mode===1? styles.active:''} for="Inspection"><p>Inspection</p></label>
        <input type="radio" id="Housekeepers" value="Housekeepers" name="mode" checked={mode === 2} onClick={()=>setMode(2)} /><label className={mode===2? styles.active:''} for="Housekeepers"><p>Housekeepers</p></label>
      </div>
    </div>
  );
};

export default Modebar;
