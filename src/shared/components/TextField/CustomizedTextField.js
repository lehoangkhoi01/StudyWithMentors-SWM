import { TextField } from "@mui/material";
import style from "./CustomizedTextField.module.scss";
import { OPTIONAL } from "../../constants/common";

const CustomizedTextField = (props) => {
  return (
    <div className={`${style.textField__container} ${props.className}`}>
      <label htmlFor={props.inputId}>{`${props.name} 
      ${!props.required ? `(${OPTIONAL})` : ""}`}</label>
      <TextField
        error={props.error}
        helperText={props.helperText}
        id={props.inputId}
        placeholder={props.placeholder}
        type={props.type ?? "text"}
        {...props.options}
      />
    </div>
  );
};

export default CustomizedTextField;
