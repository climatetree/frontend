import React, { useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import About from "./About";
import Maps from "./Maps";
import "./App.css";
import Login from "./Login";
import { Provider } from "./context/authContext";
import { authReducer, initialAuthState } from "./reducers/authReducers";

const App = () => {
  const useAuthState = useReducer(authReducer, initialAuthState);

  return (
    <Provider value={useAuthState}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/maps">
            <Maps />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
