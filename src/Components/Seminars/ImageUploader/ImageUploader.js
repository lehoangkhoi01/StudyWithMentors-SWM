import React from "react";
import { MuiFileInput } from "mui-file-input";
import style from "./ImageUploader.module.scss";

const ImageUploader = (props) => {
  return (
    <div className={`${style.imageUploader__container}`}>
      <MuiFileInput
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        helperText={props.helperText}
        error={props.error}
      />
    </div>
  );
};

export default ImageUploader;
