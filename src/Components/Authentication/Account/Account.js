import React from "react";
import { useLocation } from "react-router-dom";
import ResetPassword from "../ResetPassword/ResetPassword";

const Account = () => {
  const mode = new URLSearchParams(useLocation().search).get("mode");
  const oobCode = new URLSearchParams(useLocation().search).get("oobCode");
  const renderResetPasswordPage = () => {
    return <ResetPassword oobCode={oobCode} />;
  };

  return (
    <div>{mode == "resetPassword" && oobCode && renderResetPasswordPage()}</div>
  );
};

export default Account;
