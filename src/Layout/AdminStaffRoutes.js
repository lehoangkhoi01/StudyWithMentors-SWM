import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";
import { ROUTES } from "../shared/constants/navigation";
import FeedbackOverviewPage from "../Pages/EventFeedback/FeedbackOverviewPage";
import MentorListAdminPage from "../Pages/Mentor/MentorListAdminPage";

const AdminStaffRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route
          path={ROUTES.FEEDBACK_OVERVIEW}
          component={FeedbackOverviewPage}
        />
        <Route
          path={ROUTES.ADMIN_MENTOR_LIST}
          component={MentorListAdminPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default AdminStaffRoutes;
