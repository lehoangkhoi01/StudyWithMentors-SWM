import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "../Components/Error/NotFound/NotFoundPage";
import { ROUTES } from "../shared/constants/navigation";
import FieldListPage from "../Pages/Field/FieldListPage";
import CategoryListPage from "../Pages/Category/CategoryListPage";
import DepartmentListPage from "../Pages/Department/DepartmentListPage";
import AdminBookingListPage from "../Pages/BookingList/AdminBookingListPage";
import StaffListPage from "../Pages/Staff/StaffListPage";
import StudentListPage from "../Pages/Student/StudentListPage";
import ConfigPage from "../Pages/Config/ConfigPage";
import SeminarAdminPage from "../Pages/Seminars/SeminarAdminPage";

const AdminRoutes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={ROUTES.FIELD_LIST} component={FieldListPage} />
        <Route path={ROUTES.CATEGORY_LIST} component={CategoryListPage} />
        <Route path={ROUTES.DEPARTMENT_LIST} component={DepartmentListPage} />
        <Route
          path={ROUTES.ADMIN_BOOKING_LIST}
          component={AdminBookingListPage}
        />
        <Route path={ROUTES.STAFF_LIST} component={StaffListPage} />
        <Route path={ROUTES.STUDENT_LIST} component={StudentListPage} />
        <Route path={ROUTES.ADMIN_CONFIG} component={ConfigPage} />
        <Route
          path={ROUTES.ADMIN_SEMINAR_LIST}
          component={SeminarAdminPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default AdminRoutes;
