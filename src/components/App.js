import React, { useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "./LandingPage";
import About from "./About";
import Maps from "./Maps";
import "./App.css";
import Stories from "./Stories";
import LoginPage from "./LoginPage";
import { Provider } from "./context/authContext";
import { authReducer, initialAuthState } from "./reducers/authReducers";

const App = () => {
  const useAuthState = useReducer(authReducer, initialAuthState);
  localStorage.setItem("userRole", `4`);
  return (
    <Provider value={useAuthState}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} />} />
          <Route path="/maps" render={props => <Maps {...props} />} />
          {/* <Maps />
          </Route> */}
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/stories" render={props => <Stories {...props} />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
