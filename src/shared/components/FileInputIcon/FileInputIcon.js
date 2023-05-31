import React, { useRef } from "react";
import { Grid, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import CustomizedButton from "../Button/CustomizedButton";
import { BUTTON_LABEL } from "../../constants/common";
import style from "./FileInputIcon.module.scss";

const FileInputIcon = (props) => {
  const fileInputRef = useRef();

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Grid alignItems="center" container spacing={2}>
      <Grid item>
        <input
          type="file"
          multiple
          ref={(ref) => {
            fileInputRef.current = ref;
            props.field.ref(ref);
          }}
          style={{ display: "none" }}
          onChange={props.onChange}
        />

        <CustomizedButton
          variant="outlined"
          color="primary600"
          startIcon={<CloudUpload />}
          onClick={handleUploadButtonClick}
        >
          {BUTTON_LABEL.ADD_DOCUMENT}
        </CustomizedButton>
      </Grid>
      {props.error && (
        <Typography
          className={`${style.fileInputIcon__errorText}`}
          variant="caption"
          ml={2}
        >
          {props.error?.message}
        </Typography>
      )}
    </Grid>
  );
};

export default FileInputIcon;
