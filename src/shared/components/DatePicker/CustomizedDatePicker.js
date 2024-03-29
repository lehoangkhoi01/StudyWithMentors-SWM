import { DatePicker } from "@mui/x-date-pickers";
import style from "./CustomizedDatePicker.module.scss";
import { DATE_FORMAT, OPTIONAL } from "../../constants/common";
import React, { useLayoutEffect, useState } from "react";
import { convertISOToFormat } from "../../../Helpers/dateHelper";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";

const CustomizedDatePicker = forwardRef((props, ref) => {
  const [value, setValue] = useState(null);
  const [isMapped, setIsMapped] = useState(false);
  const dateFormat = props.format ?? DATE_FORMAT.MM_YYYY;

  useLayoutEffect(() => {
    if (!isMapped && props.value !== undefined && props.value !== "") {
      setValue(props.value ?? null);
      setIsMapped(true);
      const datevalue = convertISOToFormat(dateFormat, props.value);
      props.setValue(props.formName, datevalue);
    }
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    customSetValue(val) {
      setValue(val);
    },
  }));

  return (
    <div className={`${style.datePicker__container} ${props.className}`}>
      <label htmlFor={props.inputId}>
        {props.name}
        {!props.required ? <span>({OPTIONAL})</span> : ""}
      </label>
      <DatePicker
        disableFuture={props.disableFuture}
        disabled={props.disabled}
        disablePast={props.disablePast ?? false}
        minDate={props.minDate}
        format={dateFormat}
        views={props.views ?? ["year", "month"]}
        className={style.datePicker__input}
        // onError={props.error}
        slotProps={{
          textField: {
            helperText: props?.error?.message,
            error: props?.error?.message,
          },
        }}
        onChange={(e) => {
          const datevalue = convertISOToFormat(dateFormat, e);
          setValue(e);
          props.setValue(props.formName, datevalue);
          if (!isMapped) setIsMapped(true);
          if (props.onChange) {
            props.onChange();
          }
        }}
        value={value}
      ></DatePicker>
    </div>
  );
});

CustomizedDatePicker.displayName = "CustomizedDatePicker";
export default CustomizedDatePicker;
