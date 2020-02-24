import React from "react";
import { render } from "@testing-library/react";
import About from "../../src/components/About";
import { BrowserRouter as Router } from 'react-router-dom';

it("should render without crashing", () => {
    render( <Router><About/></Router>);
});
