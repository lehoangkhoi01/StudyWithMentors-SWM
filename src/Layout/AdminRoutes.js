import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";
import { ROUTES } from "../shared/constants/navigation";
import FieldListPage from "../Pages/Field/FieldListPage";
import CategoryListPage from "../Pages/Category/CategoryListPage";
import DepartmentListPage from "../Pages/Department/DepartmentListPage";
import MentorListAdminPage from "../Pages/Mentor/MentorListAdminPage";

const AdminRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={ROUTES.FIELD_LIST} component={FieldListPage} />
        <Route path={ROUTES.CATEGORY_LIST} component={CategoryListPage} />
        <Route path={ROUTES.DEPARTMENT_LIST} component={DepartmentListPage} />
        <Route
          path={ROUTES.ADMIN_MENTOR_LIST}
          component={MentorListAdminPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default AdminRoutes;