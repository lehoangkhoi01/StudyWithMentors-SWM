import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";
import { ROUTES } from "../shared/constants/navigation";
import TopicListPage from "../Pages/Topic/TopicListPage";

const AdminMentorRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={ROUTES.TOPIC_LIST} component={TopicListPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default AdminMentorRoutes;
