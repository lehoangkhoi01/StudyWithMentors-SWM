import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import { ROUTES } from "./shared/constants/navigation";
import SignInPage from "./Pages/Authentication/SignInPage";
import NavigationBar from "./shared/components/NavigationBar/NavigationBar";
import style from "./App.module.scss";
import LoadingProvider from "./shared/components/Loading/LoadingProvider";
import CVPage from "./Pages/CV/CVPage";
import NotFound from "./Pages/NotFound";
import ServerError from "./Pages/ServerError";
import Footer from "./shared/components/Footer/Footer";
import SeminarsPage from "./Pages/Seminars/SeminarsPage";
import SeminarDetailPage from "./Pages/Seminars/SeminarDetailPage";
import SeminarFeedbackPage from "./Pages/EventFeedback/EventFeedbackPage";
import NotiSnackbar from "./shared/components/Snackbar/NotiSnackbar";
import { Toolbar } from "@mui/material";
import MentorListPage from "./Pages/Mentor/MentorListPage";
import {
  useCustomLoading,
  useFetchUserInfo,
  useSystemConfig,
} from "./Helpers/generalHelper";
import {
  selectFirstFetch,
  selectUser,
  selectUserInfo,
  userAction,
} from "./Store/slices/userSlice";
import LoadingPage from "./Pages/LoadingPage";
import { SYSTEM_ROLE } from "./shared/constants/systemType";
import MeetingPage from "./Pages/Meeting/MeetingPage";
import FillInformationPage from "./Pages/Profile/FillInformationPage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { USER_STATUS } from "./shared/constants/common";

import StaffRoutes from "./Layout/StaffRoutes";
import AuthorizedRoute from "./Routes/AuthorizedRoute";
import MentorRoutes from "./Layout/MentorRoutes";
import AdminRoutes from "./Layout/AdminRoutes";
import MentorStudentRoutes from "./Layout/MentorStudentRoutes";
import AdminStaffRoutes from "./Layout/AdminStaffRoutes";
import AdminMentorRoutes from "./Layout/AdminMentorRoutes";
import SeminarCreatePage from "./Pages/Seminars/SeminarCreatePage";
import AboutUsPage from "./Pages/AboutUs/AboutUsPage";
import HomePage from "./Pages/Home/HomePage";

function App() {
  const user = useSelector(selectUser);
  const userInfo = useSelector(selectUserInfo);
  const { setLoading } = useCustomLoading();
  const isFirstFetch = useSelector(selectFirstFetch);
  const dispatch = useDispatch();
  const { getUserInfo } = useFetchUserInfo();
  const { getSystemConfig } = useSystemConfig();

  React.useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      const userInfoResponse = await getUserInfo();
      await getSystemConfig();

      if (
        (userInfoResponse && userInfoResponse.status === 403) ||
        !userInfoResponse
      ) {
        // expired token...
        localStorage.removeItem("TOKEN");
        dispatch(userAction.logout());
        dispatch(userAction.setFirstFetch());
      }
      setLoading(false);
    }
    fetchInitialData();
  }, []);

  if (isFirstFetch) {
    return (
      <BrowserRouter>
        <div
          className={
            [SYSTEM_ROLE.ADMIN, SYSTEM_ROLE.STAFF].includes(
              user?.userInfo?.role
            )
              ? `${style.app} ${style.app__sidebar}`
              : `${style.app} ${style.app__navbar}`
          }
        >
          <NavigationBar />
          <div id="app_content" className={`${style.content}`}>
            {[SYSTEM_ROLE.ADMIN, SYSTEM_ROLE.STAFF].includes(
              user?.userInfo?.role
            ) ? (
              <Toolbar sx={{ display: "none" }} />
            ) : null}

            <Switch className={`${style.switchContainer}`}>
              {userInfo?.status === USER_STATUS.WATTING && (
                <>
                  <Route
                    path={ROUTES.FILL_INFORMATION}
                    component={FillInformationPage}
                  />
                  <Route exact path="*">
                    <Redirect to={ROUTES.FILL_INFORMATION} />
                  </Route>
                </>
              )}
              <>

                <Route exact path={ROUTES.HOME} component={HomePage} />
                <Route path={ROUTES.ABOUT} component={AboutUsPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route exact path={`${ROUTES.CV}`} component={CVPage} />
                <Route exact path={`${ROUTES.CV}/:id`} component={CVPage} />
                <Route
                  exact
                  path={ROUTES.SEMINAR_LIST}
                  component={SeminarsPage}
                />
                <Route
                  exact
                  path={ROUTES.SEMINAR_DETAIL}
                  component={SeminarDetailPage}
                />

                <Route
                  path={ROUTES.SEMINAR_FEEDBACK}
                  component={SeminarFeedbackPage}
                />

                <Route path={ROUTES.MENTOR_LIST} component={MentorListPage} />
                <Route path={ROUTES.MEETING} component={MeetingPage} />
                <Route
                  path={ROUTES.SEMINAR_CREATE}
                  component={SeminarCreatePage}
                />
                <Route
                  path={ROUTES.SEMINAR_UPDATE}
                  component={SeminarCreatePage}
                />

                <Route path={ROUTES.NOT_FOUND} component={NotFound} />
                <Route path={ROUTES.SERVER_ERROR} component={ServerError} />

                <AuthorizedRoute
                  path="/staff"
                  roles={[SYSTEM_ROLE.STAFF]}
                  component={StaffRoutes}
                />
                <AuthorizedRoute
                  path="/mentor"
                  roles={[SYSTEM_ROLE.MENTOR]}
                  component={MentorRoutes}
                />
                <AuthorizedRoute
                  path="/admin"
                  roles={[SYSTEM_ROLE.ADMIN]}
                  component={AdminRoutes}
                />
                <AuthorizedRoute
                  path="/booking"
                  roles={[SYSTEM_ROLE.STUDENT, SYSTEM_ROLE.MENTOR]}
                  component={MentorStudentRoutes}
                />
                <AuthorizedRoute
                  path="/management"
                  roles={[SYSTEM_ROLE.ADMIN, SYSTEM_ROLE.STAFF]}
                  component={AdminStaffRoutes}
                />
                <AuthorizedRoute
                  path="/topic"
                  roles={[SYSTEM_ROLE.ADMIN, SYSTEM_ROLE.MENTOR]}
                  component={AdminMentorRoutes}
                />
                <Route exact path="/">
                  <Redirect to={ROUTES.HOME} />
                </Route>
              </>
            </Switch>
          </div>
          <LoadingProvider />
          <NotiSnackbar />
        </div>
        <Footer />
      </BrowserRouter>
    );
  } else {
    return <LoadingPage />;
  }
}

export default App;
