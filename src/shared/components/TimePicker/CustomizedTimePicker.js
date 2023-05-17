import React from "react";
import { DesktopTimePicker } from "@mui/x-date-pickers";
import style from "./CustomizedTimePicker.module.scss";
import { OPTIONAL } from "../../constants/common";

const CustomizedTimePicker = (props) => {
  return (
    <div className={`${style.datePicker__container} ${props.className}`}>
      <label htmlFor={props.inputId}>
        {props.name}
        {!props.required ? <span>({OPTIONAL})</span> : ""}
      </label>
      <DesktopTimePicker
        defaultValue={props.defaultValue ?? new Date()}
        ampm={props.ampm ?? false}
        disabled={props.disabled ?? false}
        views={props.views ?? ["hours", "minutes"]}
        className={style.datePicker__input}
      />
    </div>
  );
};

export default CustomizedTimePicker;
