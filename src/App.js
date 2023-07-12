import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import { ROUTES } from "./shared/constants/navigation";
import SignInPage from "./Pages/Authentication/SignInPage";
import SignUpPage from "./Pages/Authentication/SignUpPage";
import NavigationBar from "./shared/components/NavigationBar/NavigationBar";
import style from "./App.module.scss";
import SignUpConfirmationPage from "./Pages/Authentication/SignUpConfirmationPage";
import LoadingProvider from "./shared/components/Loading/LoadingProvider";
import CVPage from "./Pages/CV/CVPage";
import HomePage from "./Pages/HomePage";
import AccountPage from "./Pages/Authentication/AccountPage";
import NotFound from "./Pages/NotFound";
import ServerError from "./Pages/ServerError";
import Footer from "./shared/components/Footer/Footer";
import CalendarPage from "./Pages/CalendarPage";
import SeminarsPage from "./Pages/Seminars/SeminarsPage";
import SeminarDetailPage from "./Pages/Seminars/SeminarDetailPage";
import SeminarFeedbackPage from "./Pages/EventFeedback/EventFeedbackPage";
import NotiSnackbar from "./shared/components/Snackbar/NotiSnackbar";
import FeedbackOverviewPage from "./Pages/EventFeedback/FeedbackOverviewPage";
import { Toolbar } from "@mui/material";
import MentorListAdminPage from "./Pages/Mentor/MentorListAdminPage";
import DiscussionPage from "./Pages/Discussion/DiscussionPage";
import MentorListPage from "./Pages/Mentor/MentorListPage";
import { useCustomLoading, useFetchUserInfo } from "./Helpers/generalHelper";
import {
  selectFirstFetch,
  selectUser,
  userAction,
} from "./Store/slices/userSlice";
import LoadingPage from "./Pages/LoadingPage";
import { SYSTEM_ROLE } from "./shared/constants/systemType";
import StaffRoute from "./Routes/StaffRoute";
import StaffLayout from "./Layout/StaffLayout";
import MeetingPage from "./Pages/Meeting/MeetingPage";
import TopicListPage from "./Pages/Topic/TopicListPage";

function App() {
  const user = useSelector(selectUser);
  const { setLoading } = useCustomLoading();
  const isFirstFetch = useSelector(selectFirstFetch);
  const dispatch = useDispatch();
  const { getUserInfo } = useFetchUserInfo();

  React.useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      const userInfoResponse = await getUserInfo();

      if (
        (userInfoResponse && userInfoResponse.status === "403") ||
        !userInfoResponse
      ) {
        // expired token...
        console.log("expired token");
        localStorage.removeItem("TOKEN");
        dispatch(userAction.logout());
        dispatch(userAction.setFirstFetch());
      }
      setLoading(false);
    }
    fetchUserData();
  }, []);

  if (isFirstFetch) {
    return (
      <BrowserRouter>
        <div
          className={
            user?.userInfo?.role === "STAFF"
              ? `${style.app} ${style.app__sidebar}`
              : `${style.app} ${style.app__navbar}`
          }
        >
          <NavigationBar />
          <div className={`${style.content}`}>
            {user?.userInfo?.role === "STAFF" ? (
              <Toolbar sx={{ display: "none" }} />
            ) : null}
            <Switch className={`${style.switchContainer}`}>
              <Route exact path="/" component={HomePage} />
              <Route path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route
                path={ROUTES.SIGN_UP_CONFIRMATION}
                component={SignUpConfirmationPage}
              />
              <Route exact path={`${ROUTES.CV}`} component={CVPage} />
              <Route path={`${ROUTES.CV}/:id`} component={CVPage} />
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
              {/* <Route
              exact
              path={ROUTES.SEMINAR_UPDATE}
              component={SeminarCreatePage}
            />
            <Route path={ROUTES.SEMINAR_CREATE} component={SeminarCreatePage} /> */}
              <Route path={ROUTES.CALENDAR} component={CalendarPage} />
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route
                path={ROUTES.SEMINAR_FEEDBACK}
                component={SeminarFeedbackPage}
              />
              <Route
                path={ROUTES.FEEDBACK_OVERVIEW}
                component={FeedbackOverviewPage}
              />
              <Route
                path={ROUTES.ADMIN_MENTOR_LIST}
                component={MentorListAdminPage}
              />
              <Route path={ROUTES.MENTOR_LIST} component={MentorListPage} />
              <Route path={ROUTES.DISCUSSION} component={DiscussionPage} />
              <Route path={ROUTES.NOT_FOUND} component={NotFound} />
              <Route path={ROUTES.SERVER_ERROR} component={ServerError} />
              <Route path={ROUTES.CALENDAR} component={CalendarPage} />
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route
                path={ROUTES.SEMINAR_FEEDBACK}
                component={SeminarFeedbackPage}
              />
              <Route
                path={ROUTES.FEEDBACK_OVERVIEW}
                component={FeedbackOverviewPage}
              />
              <Route
                path={ROUTES.ADMIN_MENTOR_LIST}
                component={MentorListAdminPage}
              />
              <Route path={ROUTES.MENTOR_LIST} component={MentorListPage} />
              <Route path={ROUTES.DISCUSSION} component={DiscussionPage} />
              <Route path={ROUTES.MEETING} component={MeetingPage} />
              <Route path={ROUTES.TOPIC_LIST} component={TopicListPage} />
              <Route path={ROUTES.NOT_FOUND} component={NotFound} />
              <Route path={ROUTES.SERVER_ERROR} component={ServerError} />
              <StaffRoute
                path="/staff"
                component={StaffLayout}
                roles={[SYSTEM_ROLE.STAFF, SYSTEM_ROLE.ADMIN]}
              />
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
