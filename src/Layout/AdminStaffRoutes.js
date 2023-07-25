import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";
import { ROUTES } from "../shared/constants/navigation";
import FeedbackOverviewPage from "../Pages/EventFeedback/FeedbackOverviewPage";

const AdminStaffRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route
          path={ROUTES.FEEDBACK_OVERVIEW}
          component={FeedbackOverviewPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default AdminStaffRoutes;
