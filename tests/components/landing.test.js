import React from "react";
import {fireEvent, render} from "@testing-library/react";
import Landing from "../../src/components/Landing";
import { BrowserRouter as Router } from 'react-router-dom';

it("should render without crashing", () => {
   render( <Router><Landing/></Router>);
});
