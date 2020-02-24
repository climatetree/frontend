import React from "react";
import {fireEvent, getByDisplayValue, render} from "@testing-library/react";
import Nav from "../../../src/components/landingComponents/Nav";
import { BrowserRouter as Router } from 'react-router-dom';

it("should render without crashing", () => {
   render( <Router><Nav/></Router>);
});

it("should have a home link", () => {
   const { getByText } = render(<Router><Nav/></Router>);

   fireEvent.click(getByText("HOME"));
});

describe("Hamburger menu",() => {
   it("Should the hamburger menu", () => {
      window.innerWidth = 400;
      const { container } = render(<Router><Nav/></Router>);

      expect(container.classList.contains("burger")).toBe(true);
   });

   it("should show Home option when clicking on menu",() => {
      window.innerWidth = 400;
      const { getByDisplayValue } = render(<Router><Nav/></Router>);

      fireEvent.click(getByDisplayValue("burger"))
   })
});
