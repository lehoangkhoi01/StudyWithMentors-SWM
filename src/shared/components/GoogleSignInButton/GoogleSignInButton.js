import { Button } from "@mui/material";
import React from "react";
import { BUTTON_LABEL } from "../../constants/common";
import style from "./GoogleSignInButton.module.scss";

const GoogleSignInButton = ({ onClick, isDisabled = false }) => {
  return (
    <Button
      className={`${style.googleButton}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <img alt="image" src={require("../../../assets/google-icon.png")} />
      {BUTTON_LABEL.GOOGLE_LOGIN}
    </Button>
  );
};

export default GoogleSignInButton;
