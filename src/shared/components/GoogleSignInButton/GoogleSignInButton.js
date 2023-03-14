import { Button } from "@mui/material";
import React from "react";
import { BUTTON_LABEL } from "../../constants";
import style from "./GoogleSignInButton.module.scss";

const GoogleSignInButton = () => {
  return (
    <Button className={`${style.googleButton}`}>
      {BUTTON_LABEL.GOOGLE_LOGIN}
    </Button>
  );
};

export default GoogleSignInButton;
