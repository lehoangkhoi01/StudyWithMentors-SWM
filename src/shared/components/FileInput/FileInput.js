import { MuiFileInput } from "mui-file-input";
import React from "react";

const FileInput = (props) => {
  return (
    <MuiFileInput
      hideSizeText={false}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default FileInput;
