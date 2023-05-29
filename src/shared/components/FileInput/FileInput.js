import { MuiFileInput } from "mui-file-input";
import React from "react";
import { OPTIONAL } from "../../constants/common";
import style from "./FileInput.module.scss";

const FileInput = (props) => {
  return (
    <div className={`${style.fileInput__container}`}>
      <label htmlFor={props.inputId}>
        {props.label}
        {!props.required ? <span>({OPTIONAL})</span> : ""}
      </label>
      <MuiFileInput
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        helperText={props.helperText}
        errors={props.errors}
      />
    </div>
  );
};

export default FileInput;
