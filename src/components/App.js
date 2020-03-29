import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "./LandingPage";
import About from "./About";
import Maps from "./Maps";
import Stories from "./Stories";
import LoginPage from "./LoginPage";
import { UserProvider } from "./context/UserContext";
import "./App.css";

const App = () => (
  <UserProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={props => <LandingPage {...props} />} />
        <Route path="/maps" render={props => <Maps {...props} />} />
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/stories" render={props => <Stories {...props} />} />
      </Switch>
    </BrowserRouter>
  </UserProvider>
);

export default App;
