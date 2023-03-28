import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignInPage from "./Pages/Authentication/SignInPage";
import SignUpPage from "./Pages/Authentication/SignUpPage";
import NavigationBar from "./shared/components/NavigationBar/NavigationBar";
import style from "./App.module.scss";
import SignUpConfirmationPage from "./Pages/Authentication/SignUpConfirmationPage";
import FillInformationPage from "./Pages/Profile/FillInformationPage";
import LoadingProvider from "./shared/components/Loading/LoadingProvider";
import CVPage from "./Pages/CV/CVPage";

function App() {
  return (
    <BrowserRouter>
      <div className={`${style.app}`}>
        <NavigationBar />
        <LoadingProvider>
          <div className={`${style.content}`}>
            <Switch className={`${style.switchContainer}`}>
              <Route exact path="/" component={SignInPage} />
              <Route path="/sign-up" component={SignUpPage} />
              <Route path="/sign-in" component={SignInPage} />
              <Route path="/confirmation" component={SignUpConfirmationPage} />
              <Route path="/fill-information" component={FillInformationPage} />
              <Route path="/cv" component={CVPage} />
            </Switch>
          </div>
        </LoadingProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
