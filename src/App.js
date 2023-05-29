import { BrowserRouter, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./Store/slices/userSlice";
import { Route } from "react-router";
import SignInPage from "./Pages/Authentication/SignInPage";
import SignUpPage from "./Pages/Authentication/SignUpPage";
import NavigationBar from "./shared/components/NavigationBar/NavigationBar";
import style from "./App.module.scss";
import SignUpConfirmationPage from "./Pages/Authentication/SignUpConfirmationPage";
import LoadingProvider from "./shared/components/Loading/LoadingProvider";
import CVPage from "./Pages/CV/CVPage";
import HomePage from "./Pages/HomePage";
import AccountPage from "./Pages/Authentication/AccountPage";
import { ROUTES } from "./shared/constants/navigation";
import NotFound from "./Pages/NotFound";
import ServerError from "./Pages/ServerError";
import Footer from "./shared/components/Footer/Footer";
import CalendarPage from "./Pages/CalendarPage";
import SeminarList from "./Components/Seminars/SeminarList/SeminarList";

import SeminarDetail from "./Components/Seminars/SeminarDetail/SeminarDetail";
import EventFeedbackPage from "./Pages/EventFeedback/EventFeedbackPage";
import SeminarCreate from "./Pages/Seminars/SeminarCreate";

function App() {
  const user = useSelector(selectUser);
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
          <Switch className={`${style.switchContainer}`}>
            <Route exact path="/" component={HomePage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
              path={ROUTES.SIGN_UP_CONFIRMATION}
              component={SignUpConfirmationPage}
            />
            <Route path={ROUTES.CV} component={CVPage} />
            <Route exact path={ROUTES.SEMINAR_LIST} component={SeminarList} />
            <Route
              exact
              path={ROUTES.SEMINAR_DETAIL}
              component={SeminarDetail}
            />
            <Route
              exact
              path={ROUTES.SEMINAR_CREATE}
              component={SeminarCreate}
            />
            <Route path={ROUTES.CALENDAR} component={CalendarPage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.EVENT_FEEDBACK} component={EventFeedbackPage} />
            <Route path={ROUTES.NOT_FOUND} component={NotFound} />
            <Route path={ROUTES.SERVER_ERROR} component={ServerError} />
          </Switch>
        </div>
        <LoadingProvider />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
