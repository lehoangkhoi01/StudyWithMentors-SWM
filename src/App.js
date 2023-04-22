import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router";
import SignInPage from "./Pages/Authentication/SignInPage";
import SignUpPage from "./Pages/Authentication/SignUpPage";
import NavigationBar from "./shared/components/NavigationBar/NavigationBar";
import style from "./App.module.scss";
import SignUpConfirmationPage from "./Pages/Authentication/SignUpConfirmationPage";
import FillInformationPage from "./Pages/Profile/FillInformationPage";
import LoadingProvider from "./shared/components/Loading/LoadingProvider";
import CVPage from "./Pages/CV/CVPage";
import ForgotPasswordPage from "./Pages/Authentication/ForgotPasswordPage";
import HomePage from "./Pages/HomePage";
import AccountPage from "./Pages/Authentication/AccountPage";
import { ROUTES } from "./shared/constants/common";
import NotFound from "./Pages/NotFound";
import ServerError from "./Pages/ServerError";
import Footer from "./shared/components/Footer/Footer";
import CalendarPage from "./Pages/CalendarPage";

function App() {
  return (
    <BrowserRouter>
      <div className={`${style.app}`}>
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
            <Route
              path={ROUTES.FILL_INFORMATION}
              component={FillInformationPage}
            />
            <Route path={ROUTES.CV} component={CVPage} />
            <Route
              path={ROUTES.FORGOT_PASSWORD}
              component={ForgotPasswordPage}
            />
            <Route path={ROUTES.CALENDAR} component={CalendarPage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.NOT_FOUND} component={NotFound} />
            <Route path={ROUTES.SERVER_ERROR} component={ServerError} />
          </Switch>
        </div>
        <Footer />
        <LoadingProvider />
      </div>
    </BrowserRouter>
  );
}

export default App;
