import React, { useState } from "react";
import styles from "./FilterBar.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const FilterBar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.filterbar}>
      <div
        className={styles.filterbar_label}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className={`${styles.arrow}  ${open ? styles.active : ""}`}>
          <KeyboardArrowDownIcon sx={{ marginTop: "5px" }} />
        </div>
        <p>Filter</p>
      </div>
      {open && (
        <div className={styles.hiddenBox}>
          <div className={styles.Allselect}>
            <div className={styles.select}>
              <label for="room type">Room Type</label>
              <select name="room type" id="room type">
                <option value="all">All</option>
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
              </select>
            </div>

            <div className={styles.select}>
              <label for="room type">Room Type</label>
              <select name="room type" id="room type">
                <option value="all">All</option>
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
              </select>
            </div>

            <div className={styles.select}>
              <label for="room type">Room Type</label>
              <select name="room type" id="room type">
                <option value="all">All</option>
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
              </select>
            </div>

            <div className={styles.select}>
              <label for="room type">Room Type</label>
              <select name="room type" id="room type">
                <option value="all">All</option>
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
              </select>
            </div>

            <div className={styles.select}>
              <label for="room type">Room Type</label>
              <select name="room type" id="room type">
                <option value="all">All</option>
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
                <option value="placeholder1">placeholder1</option>
              </select>
            </div>
          </div>
          <div className={styles.actions}>
            <button type="submit">Apply</button>
            <button type="submit">Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
