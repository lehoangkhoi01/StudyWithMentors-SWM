import { TextField } from "@mui/material";
import style from "./CustomizedTextField.module.scss";
import { BREAK_POINT, OPTIONAL } from "../../constants/common";
import { useMediaQuery } from "react-responsive";

const CustomizedTextField = (props) => {
  const isXL = useMediaQuery({
    query: `(min-width: ${BREAK_POINT.XL}px)`,
  });
  const isLG = useMediaQuery({ query: `(min-width: ${BREAK_POINT.LG}px)` });
  const isMD = useMediaQuery({ query: `(min-width: ${BREAK_POINT.MD}px)` });

  return (
    <div className={`${style.textField__container} ${props.className}`}>
      <label htmlFor={props.inputId}>
        {props.name}
        {!props.required ? <span>({OPTIONAL})</span> : ""}
      </label>
      <TextField
        multiline={props.multiline}
        rows={isXL ? 8 : isLG ? 6 : isMD ? 4 : 2}
        error={props.error}
        helperText={props.helperText}
        id={props.inputId}
        placeholder={props.placeholder}
        type={props.type ?? "text"}
        {...props.options}
        required={!props.optional}
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
