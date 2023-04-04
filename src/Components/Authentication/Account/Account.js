import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import ResetPassword from "../ResetPassword/ResetPassword";
import SignUpSuccess from "../SignUpSuccess/SignUpSuccess";
import { authenticationService } from "../../../Services/authenticationService";
import { ROUTES } from "../../../shared/constants/common";

const Account = () => {
  const history = useHistory();
  const mode = new URLSearchParams(useLocation().search).get("mode");
  const oobCode = new URLSearchParams(useLocation().search).get("oobCode");

  const verifyEmail = async () => {
    try {
      await authenticationService.verifyEmail(oobCode);
    } catch (error) {
      console.log(error);
      history.push(ROUTES.SERVER_ERROR);
    }
  };

  if (mode === "verifyEmail" && oobCode) {
    verifyEmail();
    return <SignUpSuccess />;
  } else if (mode === "resetPassword" && oobCode) {
    return <ResetPassword oobCode={oobCode} />;
  } else {
    return <div>Not found</div>;
  }
};

export default Account;
