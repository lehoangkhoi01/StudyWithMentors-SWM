import { DatePicker } from "@mui/x-date-pickers";
import style from "./CustomizedDatePicker.module.scss";
import { OPTIONAL } from "../../constants";

const CustomizedDatePicker = (props) => {
  console.log({ ...props.options });

  return (
    <div className={`${style.datePicker__container} ${props.className}`}>
      <label htmlFor={props.inputId}>{`${props.name} 
      ${!props.required ? `(${OPTIONAL})` : ""}`}</label>
      <DatePicker
        className={style.datePicker__input}
        {...props.options}
        onChange={(e) => {
          // const date = e.getDate();
          // const month = e.getUTCMonth() + 1;
          // const year = e.getFullYear();
          props.setValue(props.formName, e);
        }}
      ></DatePicker>
    </div>
  );
};

export default CustomizedDatePicker;
