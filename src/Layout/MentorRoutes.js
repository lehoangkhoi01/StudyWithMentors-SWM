import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";
import { ROUTES } from "../shared/constants/navigation";
import CalendarPage from "../Pages/CalendarPage";

const MentorRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={ROUTES.CALENDAR} component={CalendarPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default MentorRoutes;
