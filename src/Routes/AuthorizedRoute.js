import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { ROUTES } from "../shared/constants/navigation";
import { selectIsAuthenticated, selectUser } from "../Store/slices/userSlice";

const AuthorizedRoute = ({ component, roles, ...rest }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated || !roles.includes(user.userInfo?.role)) {
          return <Redirect to={ROUTES.NOT_FOUND} />;
        } else {
          return React.createElement(component, props);
        }
      }}
    />
  );
};

export default AuthorizedRoute;
