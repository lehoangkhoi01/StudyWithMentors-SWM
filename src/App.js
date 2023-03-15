import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignInPage from "./Pages/Authentication/SignInPage";
import SignUpPage from "./Pages/Authentication/SignUpPage";
import NavigationBar from "./shared/components/NavigationBar/NavigationBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={SignInPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/sign-in" component={SignInPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
