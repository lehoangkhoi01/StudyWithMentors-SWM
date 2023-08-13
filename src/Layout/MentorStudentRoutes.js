import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";
import { ROUTES } from "../shared/constants/navigation";
import { BookingListPage } from "../Pages/BookingList/BookingListPage";

const MentorStudentRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={ROUTES.BOOKING_LIST} component={BookingListPage} />
        <Route
          exact
          path={`${ROUTES.BOOKING_LIST}/:id`}
          component={BookingListPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default MentorStudentRoutes;
