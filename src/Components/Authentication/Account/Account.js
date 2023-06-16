import React from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import ResetPassword from "../ResetPassword/ResetPassword";
import { authenticationService } from "../../../Services/authenticationService";
import { ROUTES } from "../../../shared/constants/navigation";
import SignUpSuccess from "../SignUpSuccess/SignUpSuccess";

const Account = () => {
  const history = useHistory();
  const mode = new URLSearchParams(useLocation().search).get("mode");
  const oobCode = new URLSearchParams(useLocation().search).get("oobCode");

  const verifyEmail = async () => {
    try {
      await authenticationService.verifyEmail(oobCode);
    } catch (error) {
      history.push(ROUTES.SERVER_ERROR);
    }
  };

  if (mode === "verifyEmail" && oobCode) {
    verifyEmail();
    return <SignUpSuccess />;
  } else if (mode === "resetPassword" && oobCode) {
    return <ResetPassword oobCode={oobCode} />;
  } else {
    return <Redirect to="/not-found" />;
  }
};

export default Account;
