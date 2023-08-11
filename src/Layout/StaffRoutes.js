import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";
import { ROUTES } from "../shared/constants/navigation";
import SeminarAdminPage from "../Pages/Seminars/SeminarAdminPage";

const StaffRoutes = () => {
  return (
    <React.Fragment>
      <Route
          path={ROUTES.ADMIN_SEMINAR_LIST}
          component={SeminarAdminPage}
        />
      <Switch>
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default StaffRoutes;
