import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Nav from "./Nav";
import SideNav from "./helpComponents/SideNav";
import GeneralTopic from "./helpComponents/GeneralTopic";
import MapTopic from "./helpComponents/MapTopic";
import ResearchTopic from "./helpComponents/ResearchTopic";
import StoriesTopic from "./helpComponents/StoriesTopic";

import "./HelpPage.css";

const HelpPage = () => {
  let { path } = useRouteMatch();

  console.log(path);

  return (
    <>
      <Nav />
      <div id="help-background"></div>
      <div id="help-container">
        <SideNav />
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
        </Switch>
      </div>
    </>
  );
};

export default HelpPage;
