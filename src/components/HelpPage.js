import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Nav from "./Nav";
import HelpSideNav from "./helpComponents/HelpSideNav";
import GeneralTopic from "./helpComponents/GeneralTopic";
import MapTopic from "./helpComponents/MapTopic";
import ResearchTopic from "./helpComponents/ResearchTopic";
import StoriesTopic from "./helpComponents/StoriesTopic";
import LoginProfileTopic from "./helpComponents/LoginProfileTopic";

import "./HelpPage.css";

const HelpPage = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Nav />
      <div id="help-background"></div>
      <div id="help-container">
        <HelpSideNav />
        <Switch>
          <Route exact path={`${path}`}>
            <GeneralTopic />
          </Route>
          <Route exact path={`${path}/stories`}>
            <StoriesTopic />
          </Route>
          <Route path={`${path}/map`}>
            <MapTopic />
          </Route>
          <Route path={`${path}/research`}>
            <ResearchTopic />
          </Route>
          <Route path={`${path}/login-profile`}>
            <LoginProfileTopic />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default HelpPage;
