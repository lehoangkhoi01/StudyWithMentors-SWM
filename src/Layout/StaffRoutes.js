import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";
import SeminarCreatePage from "../Pages/Seminars/SeminarCreatePage";
import { ROUTES } from "../shared/constants/navigation";

const StaffRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={ROUTES.SEMINAR_CREATE} component={SeminarCreatePage} />
        <Route path={ROUTES.SEMINAR_UPDATE} component={SeminarCreatePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default StaffRoutes;
