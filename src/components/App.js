import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./Landing";
import About from "./About";
import Maps from "./Maps";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/maps" component={Maps} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
