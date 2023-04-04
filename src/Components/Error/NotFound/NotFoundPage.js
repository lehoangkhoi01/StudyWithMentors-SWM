import React from "react";
import { Typography } from "@mui/material";
import { COMMON_MESSAGE } from "../../../shared/constants/common";
import style from "./NotFound.module.scss";

const NotFoundPage = () => {
  return (
    <div className={`${style.container}`}>
      <img
        alt="not-found-image"
        src={require("../../../assets/NotFound.png")}
        width={"40%"}
      />
      <Typography variant="h5" className={`${style.message}`}>
        {COMMON_MESSAGE.NOT_FOUND}
      </Typography>
    </div>
  );
};

export default NotFoundPage;
