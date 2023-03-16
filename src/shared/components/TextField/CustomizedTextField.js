import { TextField } from "@mui/material";
import style from "./CustomizedTextField.module.scss";

const CustomizedTextField = (props) => {
  return (
    <div className={style.textField__container}>
      <label htmlFor={props.inputId}>{props.name}</label>
      <TextField
        className={style.textField__input}
        id={props.inputId}
        placeholder={props.placeholder}
        required={props.required}
        type={props.type}
        {...props.options}
      />
    </div>
  );
};

export default CustomizedTextField;
