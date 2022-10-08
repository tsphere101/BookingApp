import React from "react";
import styles from "./Modebar.module.css";
import { useState } from "react";
import RadioButton from "../Reuseable/RadioButton";

const Modebar = () => {
  const [mode, setMode] = useState("Inspection");

  return (
    <div className={styles.modebar}>
      <RadioButton
        className={styles.modeBtn}
        title="Inspection"
        group="mode"
        current={mode}
        onClick={setMode}
      />
      <RadioButton
        className={styles.modeBtn}
        title="Housekeepers"
        group="mode"
        current={mode}
        onClick={setMode}
      />
    </div>
  );
};

export default Modebar;
