import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ImageSlider from "ac-react-simple-image-slider";

//Redux
import store from "./store";
import { loadToken } from "./actions/auth";

import Header from "./components/layout/Header";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import Products from "./components/product/Products";
import Advertisement from "./components/graphics/Advertisement";

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
        <Route exact path="/profile" component={Profile} />

        <Route exact path="/" component={Advertisement} />
        <Route exact path="/" component={Products} />
      </Fragment>
    </Router>
  );
};

export default App;
