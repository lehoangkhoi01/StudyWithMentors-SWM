import { TextField } from "@mui/material";
import style from "./CustomizedTextField.module.scss";

const CustomizedTextField = (props) => {
  return (
    <div className={style.textField__container}>
      <label htmlFor={props.inputId}>
        <span className={style.textField__required}>*</span>
        {props.name}
      </label>
      <TextField
        id={props.inputId}
        placeholder={props.placeholder}
        {...props.options}
      />
    </div>
  );
};

export default CustomizedTextField;
