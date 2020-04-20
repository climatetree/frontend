import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Nav from "./Nav";
import AboutSideNav from "./aboutComponents/AboutSideNav";
import ClimateTreeDef from "./aboutComponents/ClimateTreeDef";
import ClimateTreeStory from "./aboutComponents/ClimateTreeStory";
import ClimateTreeTeam from "./aboutComponents/ClimateTreeTeam";
import SpaceReflection from "./aboutComponents/SpaceReflection";

import "./About.css";

const About = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Nav />
      <AboutSideNav />
      <div id="about-background"></div>
      <div id="about">
        <Switch>
          <Route exact path={`${path}`}>
            <ClimateTreeStory />
          </Route>
          <Route path={`${path}/team`}>
            <ClimateTreeTeam />
          </Route>
          <Route path={`${path}/definition`}>
            <ClimateTreeDef />
          </Route>
          <Route path={`${path}/space-reflection`}>
            <SpaceReflection />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default About;
