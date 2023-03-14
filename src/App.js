import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUpPage from "./Pages/Authentication/SignUpPage";
import SignInPage from "./Pages/Authentication/SignInPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={SignUpPage} />
          <Route exact path="/sign-in" component={SignInPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
