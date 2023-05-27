import { DateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import { OPTIONAL } from "../../constants/common";
import style from "./CustomizedDateTimePicker.module.scss";

const CustomizedDateTimePicker = (props) => {
  return (
    <div className={`${style.datePicker__container} ${props.className}`}>
      <label htmlFor={props.inputId}>
        {props.name}
        {!props.required ? <span>({OPTIONAL})</span> : ""}
      </label>
      <DateTimePicker
        defaultValue={props.defaultValue ?? new Date()}
        ampm={props.ampm ?? false}
        disabled={props.disabled ?? false}
        views={props.views ?? ["hours", "minutes"]}
        className={style.datePicker__input}
        {...props.options}
      />
    </div>
  );
};

export default CustomizedDateTimePicker;
