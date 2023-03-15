import React from "react";
import { Divider } from "@mui/material";
import style from "./CustomDivider.module.scss";

const CustomDivider = ({ text }) => {
  return (
    <div className={`${style.divider__container}`}>
      <Divider
        className={`${style.divider}`}
        textAlign="center"
        sx={{ width: "100%" }}
        flexItem
      >
        {text}
      </Divider>
    </div>
  );
};

export default CustomDivider;
