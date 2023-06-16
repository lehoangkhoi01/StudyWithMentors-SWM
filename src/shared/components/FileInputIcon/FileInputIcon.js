import React, { useRef } from "react";
import { Grid, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import CustomizedButton from "../Button/CustomizedButton";
import {
  BUTTON_LABEL,
  VALID_DOCS_FILE_TYPE_STRING,
} from "../../constants/common";
import style from "./FileInputIcon.module.scss";

const FileInputIcon = (props) => {
  const fileInputRef = useRef();

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {props.error && (
        <Typography
          className={`${style.fileInputIcon__errorText}`}
          variant="caption"
          mb={2}
          textAlign="left"
        >
          {props.error?.message}
        </Typography>
      )}
      <Grid alignItems="center" container spacing={2}>
        <Grid item>
          <input
            type="file"
            accept={VALID_DOCS_FILE_TYPE_STRING}
            multiple
            ref={(ref) => {
              fileInputRef.current = ref;
              props.field.ref(ref);
            }}
            style={{ display: "none" }}
            onChange={props.onChange}
            onClick={(event) => {
              event.target.value = null;
            }}
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
      </Grid>
    </>
  );
};

export default FileInputIcon;
