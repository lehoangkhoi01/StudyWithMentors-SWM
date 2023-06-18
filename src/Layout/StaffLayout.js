import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";
import SeminarCreatePage from "../Pages/Seminars/SeminarCreatePage";
//import NavigationBar from "../shared/components/NavigationBar/NavigationBar";

const StaffLayout = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/admin/seminar-create" component={SeminarCreatePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default StaffLayout;
