import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./Landing";
import About from "./About";
import Maps from "./Maps";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route path="/about" component={About} />
        <Route path="/maps" component={Maps} />
      </BrowserRouter>
    </div>
  );
};

export default App;
