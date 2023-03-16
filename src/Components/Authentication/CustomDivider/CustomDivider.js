import React from "react";
import { Divider } from "@mui/material";
import style from "./CustomDivider.module.scss";

const CustomDivider = ({ text }) => {
  return (
    <div className={`${style.divider__container}`}>
      {text ? (
        <Divider
          className={`${style.divider}`}
          textAlign="center"
          sx={{ width: "100%" }}
          flexItem
        >
          {text}
        </Divider>
      ) : (
        <Divider
          className={`${style.divider_without_text}`}
          textAlign="center"
          sx={{ width: "100%" }}
          flexItem
        />
      )}
    </div>
  );
};

export default CustomDivider;
