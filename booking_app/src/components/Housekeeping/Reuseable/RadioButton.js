import React from "react";
import styles from '../Reuseable/RadioButton.module.css'
const RadioButton = (props) => {
  return (
    <div className={`${styles.navRadio} ${props.className}`}>
      <input type="radio" id={props.title} name={props.groupName} value={props.title} checked={props.title === props.current ? 'checked':''}/>
      <label onClick={()=>props.onClick(props.title)} for={props.title}>{props.title}</label>
    </div>
  );
};

export default RadioButton;
