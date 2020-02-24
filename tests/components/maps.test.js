import React from "react";
import { render } from "@testing-library/react";
import Maps from "../../src/components/Maps";
import { BrowserRouter as Router } from 'react-router-dom';

it("should render without crashing", () => {
    render( <Router><Maps/></Router>);
});
