import { TextField } from "@mui/material";
import style from "./CustomizedTextField.module.scss";
import { OPTIONAL } from "../../constants/common";
import { BREAK_POINT } from "../../constants/globalStyle";
import { useMediaQuery } from "react-responsive";
import { useRef, useState } from "react";

const CustomizedTextField = (props) => {
  const isXL = useMediaQuery({
    query: `(min-width: ${BREAK_POINT.XL}px)`,
  });
  const isLG = useMediaQuery({ query: `(min-width: ${BREAK_POINT.LG}px)` });
  const isMD = useMediaQuery({ query: `(min-width: ${BREAK_POINT.MD}px)` });

  const inputRef = useRef();

  const [valueLength, setValueLength] = useState();

  const isValueMaxLength = () => {
    return valueLength >= props.maxLength ?? 2000;
  };

  const onChange = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }
    setValueLength(inputRef.current?.value?.length);
  };

  return (
    <div
      className={`${style.textField__container} ${props.className} ${
        props.disabled ? style.textField__disable : ""
      }`}
    >
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
        required={props.required}
        {...props.options}
        disabled={props.disabled ?? false}
        onChange={!isValueMaxLength() ? onChange ?? null : null}
        value={props.value}
        inputProps={{ maxLength: props.maxLength ?? 2000 }}
        inputRef={inputRef}
      />
      {props.multiline && (
        <span className={`${style.textField__limit}`}>
          {valueLength ?? 0} / {props.maxLength ?? 2000}
        </span>
      )}
    </div>
  );
};

export default CustomizedTextField;
