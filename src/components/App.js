import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import LandingPage from "./LandingPage";
import About from "./About";
import Maps from "./Maps";
import './App.css';

const App = () => {
  return (
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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
