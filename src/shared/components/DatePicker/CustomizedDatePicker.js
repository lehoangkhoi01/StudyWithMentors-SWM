import { DatePicker } from "@mui/x-date-pickers";
import style from "./CustomizedDatePicker.module.scss";
import { DATE_FORMAT, OPTIONAL } from "../../constants/common";
import React, { useLayoutEffect, useState } from "react";
import { convertISOToFormat } from "../../../Helpers/dateHelper";

const CustomizedDatePicker = (props) => {
  const [value, setValue] = useState(null);
  const [isMapped, setIsMapped] = useState(false);
  const dateFormat = props.format ?? DATE_FORMAT.MM_YYYY;

  useLayoutEffect(() => {
    if (!isMapped && props.value !== undefined && props.value !== "") {
      console.log("Mapped");
      setValue(props.value ?? null);
      setIsMapped(true);
    }
  }, [props.value]);

  return (
    <div className={`${style.datePicker__container} ${props.className}`}>
      <label htmlFor={props.inputId}>
        {props.name}
        {!props.required ? <span>({OPTIONAL})</span> : ""}
      </label>
      <DatePicker
        disabled={props.disabled}
        format={dateFormat}
        views={props.views ?? ["year", "month"]}
        className={style.datePicker__input}
        onError={props.error}
        slotProps={{
          textField: {
            helperText: props?.error?.message,
            error: props?.error?.message,
          },
        }}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange();
          }
          const datevalue = convertISOToFormat(dateFormat, e);
          setValue(e);
          props.setValue(props.formName, datevalue);

          if (!isMapped) setIsMapped(true);
        }}
        value={value}
      ></DatePicker>
    </div>
  );
};

export default CustomizedDatePicker;
