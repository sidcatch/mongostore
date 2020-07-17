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

const imageData = [
  {
    src: "/public/large-images/2007024_organic-store_400.webp",
    title: "Image 1",
  },
  {
    src:
      "/public/large-images/All_Home-Kitchen-Essentials_DT_3_1130x400_11thJuly.webp",
    title: "Image 2",
  },
];

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
        <div
          style={{
            backgroundColor: "silver",
            marginBottom: "20px",
          }}
        >
          <ImageSlider
            height=""
            width="98.5vw"
            duration={100}
            showDots={false}
            data={imageData}
          />
        </div>

        <Route exact path="/" component={Products} />
      </Fragment>
    </Router>
  );
};

export default App;
