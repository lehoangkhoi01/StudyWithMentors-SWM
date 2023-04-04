import React from "react";
import style from "./ServerError.module.scss";
import { Typography } from "@mui/material";
import { COMMON_MESSAGE } from "../../../shared/constants/common";

const ServerErrorPage = () => {
  return (
    <div className={`${style.container}`}>
      <img
        alt="not-found-image"
        src={require("../../../assets/ServerError.png")}
        width={"40%"}
      />
      <Typography variant="h5" className={`${style.message}`}>
        {COMMON_MESSAGE.SERVER_ERROR}
      </Typography>
    </div>
  );
};

export default ServerErrorPage;
