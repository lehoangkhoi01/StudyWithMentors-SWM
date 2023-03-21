import { Button } from "@mui/material";
import React from "react";
import { BUTTON_LABEL } from "../../constants";
import style from "./GoogleSignInButton.module.scss";

const GoogleSignInButton = ({ onClick }) => {
  return (
    <Button className={`${style.googleButton}`} onClick={onClick}>
      {BUTTON_LABEL.GOOGLE_LOGIN}
    </Button>
  );
};

export default GoogleSignInButton;
