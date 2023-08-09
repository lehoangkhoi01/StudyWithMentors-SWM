import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";

const StaffRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default StaffRoutes;
