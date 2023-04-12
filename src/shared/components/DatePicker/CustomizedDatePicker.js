import { DatePicker } from "@mui/x-date-pickers";
import style from "./CustomizedDatePicker.module.scss";
import { DATE_FORMAT, OPTIONAL } from "../../constants/common";
import { useEffect, useState } from "react";

const CustomizedDatePicker = (props) => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div className={`${style.datePicker__container} ${props.className}`}>
      <label htmlFor={props.inputId}>
        {props.name}
        {!props.required ? <span>({OPTIONAL})</span> : ""}
      </label>
      <DatePicker
        format={DATE_FORMAT.MM_YYYY}
        views={["year", "month"]}
        className={style.datePicker__input}
        {...props.options}
        onChange={(e) => {
          setValue(e);
          props.setValue(props.formName, e);
        }}
        value={value}
      ></DatePicker>
    </div>
  );
};

export default CustomizedDatePicker;
