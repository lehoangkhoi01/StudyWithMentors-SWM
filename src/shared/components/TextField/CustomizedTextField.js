import { TextField } from "@mui/material";
import style from "./CustomizedTextField.module.scss";
import { OPTIONAL } from "../../constants";

const CustomizedTextField = (props) => {
  return (
    <div className={`${style.textField__container} ${props.className}`}>
      <label htmlFor={props.inputId}>{`${props.name} 
      ${!props.required ? `(${OPTIONAL})` : ""}`}</label>
      <TextField
        id={props.inputId}
        placeholder={props.placeholder}
        required={props.required}
        type={props.type ?? "text"}
        {...props.options}
      />
    </div>
  );
};

export default CustomizedTextField;
