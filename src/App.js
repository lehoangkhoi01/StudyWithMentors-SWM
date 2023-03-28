import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import { ROUTES } from "./shared/constants/common";

function App() {
  return (
    <BrowserRouter>
      <div className={`${style.app}`}>
        <NavigationBar />
        <LoadingProvider>
          <div className={`${style.content}`}>
            <Switch className={`${style.switchContainer}`}>
              <Route exact path="/" component={SignInPage} />
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
            </Switch>
          </div>
        </LoadingProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
