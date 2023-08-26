import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";
import { ROUTES } from "../shared/constants/navigation";
import MentorListAdminPage from "../Pages/Mentor/MentorListAdminPage";
import SeminarAdminPage from "../Pages/Seminars/SeminarAdminPage";

const AdminStaffRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route
          path={ROUTES.ADMIN_MENTOR_LIST}
          component={MentorListAdminPage}
        />
        <Route path={ROUTES.ADMIN_SEMINAR_LIST} component={SeminarAdminPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default AdminStaffRoutes;
