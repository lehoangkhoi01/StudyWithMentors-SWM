import { TextField } from "@mui/material";
import style from "./CustomizedTextField.module.scss";
import { OPTIONAL } from "../../constants/common";

const CustomizedTextField = (props) => {
  return (
    <div className={`${style.textField__container} ${props.className}`}>
      <label htmlFor={props.inputId}>
        {props.name}
        {!props.required ? <span>({OPTIONAL})</span> : ""}
      </label>
      <TextField
        multiline={props.multiline}
        rows={6}
        error={props.error}
        helperText={props.helperText}
        id={props.inputId}
        placeholder={props.placeholder}
        type={props.type ?? "text"}
        {...props.options}
      />
      {props.multiline && (
        <span className={`${style.textField__limit}`}>
          {props.watch?.length ?? 0} / 2000
        </span>
      )}
    </div>
  );
};

export default CustomizedTextField;
