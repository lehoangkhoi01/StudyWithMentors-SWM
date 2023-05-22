import { DatePicker } from "@mui/x-date-pickers";
import style from "./CustomizedDatePicker.module.scss";
import { DATE_FORMAT, OPTIONAL } from "../../constants/common";
import { useLayoutEffect, useState } from "react";
import { convertISOToFormat } from "../../../Helpers/dateHelper";

const CustomizedDatePicker = (props) => {
  const [value, setValue] = useState(null);
  const [isMapped, setIsMapped] = useState(false);

  useLayoutEffect(() => {
    console.log(props.value);
    if (!isMapped && props.value !== undefined && props.value !== "") {
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
        format={DATE_FORMAT.MM_YYYY}
        views={["year", "month"]}
        className={style.datePicker__input}
        onError={props.error}
        slotProps={{
          textField: {
            helperText: props?.error?.message,
          },
        }}
        onChange={(e) => {
          const datevalue = convertISOToFormat(DATE_FORMAT.MM_YYYY, e);

          setValue(e);
          props.setValue(props.formName, datevalue);

          console.log(props.getValues());
        }}
        value={value}
      ></DatePicker>
    </div>
  );
};

export default CustomizedDatePicker;
