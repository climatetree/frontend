import React from "react";
import {render} from "@testing-library/react";
import FirstScreen from "../../../src/components/landingComponents/FirstScreen";
import { BrowserRouter as Router } from 'react-router-dom';

it("should render without crashing", () => {
   render( <Router><FirstScreen/></Router>);
});
