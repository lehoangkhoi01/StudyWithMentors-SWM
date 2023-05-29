import { DateTimePicker } from "@mui/x-date-pickers";
import React from "react";
import { DATE_FORMAT, OPTIONAL } from "../../constants/common";
import style from "./CustomizedDateTimePicker.module.scss";

const CustomizedDateTimePicker = (props) => {
  const dateFormat = props.format ?? DATE_FORMAT.DD_MM_YYYY__HH_mm;
  return (
    <div className={`${style.datePicker__container} ${props.className}`}>
      <label htmlFor={props.inputId}>
        {props.label}
        {!props.required ? <span>({OPTIONAL})</span> : ""}
      </label>
      <DateTimePicker
        ampm={props.ampm}
        format={dateFormat}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled ?? false}
        className={style.datePicker__input}
      />
    </div>
  );
};

export default CustomizedDateTimePicker;
