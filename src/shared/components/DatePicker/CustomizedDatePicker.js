import { DatePicker } from "@mui/x-date-pickers";
import style from "./CustomizedDatePicker.module.scss";
import { DATE_FORMAT, OPTIONAL } from "../../constants/common";
import { useEffect, useState } from "react";
import { convertISOToFormat } from "../../../Helpers/dateHelper";

const CustomizedDatePicker = (props) => {
  const [value, setValue] = useState(null);

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
        disabled={props.disabled}
        format={DATE_FORMAT.MM_YYYY}
        views={["year", "month"]}
        className={style.datePicker__input}
        {...props.options}
        onChange={(e) => {
          const datevalue = convertISOToFormat(DATE_FORMAT.MM_YYYY, e);

          setValue(e);
          props.setValue(props.formName, datevalue);
        }}
        value={value}
      ></DatePicker>
    </div>
  );
};

export default CustomizedDatePicker;
