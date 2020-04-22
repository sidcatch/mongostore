import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Redux
import store from "./store";
import { loadToken } from "./actions/auth";

import Header from "./components/layout/Header";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";

import "./App.css";

const App = () => {
  useEffect(() => {
    store.dispatch(loadToken());
  }, []);

  return (
    <Router>
      <Fragment>
        <Header />

        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <ul className="test-list">
        
          <li>Hey</li>
          <li>Hey</li>
          <li>Hey</li>
          <li>Hey</li>
          <li>Hey</li>
          <li>Hey</li>
        </ul>
      </Fragment>
    </Router>
  );
};

export default App;
