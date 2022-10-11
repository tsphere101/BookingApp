import React, { useState } from "react";
import styles from "./FilterBar.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const FilterBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.filterbar} onClick={() => setOpen((prev) => !prev)}>
      <div className={styles.filterbar_label}>
        <div className={`${styles.arrow}  ${open ? styles.active:''}`}>
          <KeyboardArrowDownIcon sx={{ marginTop: "5px" }} />
        </div>
        <p>Filter</p>
      </div>
      {open && (
        <div className={styles.hiddenBox}>
          <div className={styles.selectBox}>
            <div>
              <select name="room type" id="room type">
                <option value="" selected disabled hidden />
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
              </select>
              <label for="room type">Room Type</label>
            </div>
          </div>
          <div className={styles.actions}>
            <button>Apply</button>
            <button>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
