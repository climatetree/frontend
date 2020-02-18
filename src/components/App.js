import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import About from "./About";
import Maps from "./Maps";
import "./App.css";
import Stories from "./Stories";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={props => <LandingPage {...props} />} />
        <Route path="/maps">
          <Maps />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/stories" render={props => <Stories {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
