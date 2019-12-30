import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect  } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import Admin from "layouts/Admin.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={Admin} />
      <Route path="/admin" component={Admin} />
      <Route path="/" component={LoginPage} />

    </Switch>
  </Router>,
  document.getElementById("root")
);
