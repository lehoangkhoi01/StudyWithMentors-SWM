import { DatePicker } from "@mui/x-date-pickers";
import style from "./CustomizedDatePicker.module.scss";
import { OPTIONAL } from "../../constants";

const CustomizedDatePicker = (props) => {
  return (
    <div className={`${style.datePicker__container} ${props.className}`}>
      <label htmlFor={props.inputId}>{`${props.name} 
      ${!props.required ? `(${OPTIONAL})` : ""}`}</label>
      <DatePicker
        className={style.datePicker__input}
        id={props.inputId}
        {...props.options}
      ></DatePicker>
    </div>
  );
};

export default CustomizedDatePicker;
