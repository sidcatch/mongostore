import React, { Fragment /* , useEffect  */ } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Redux
//import { store } from "./store";
//import { loadToken } from "./actions/auth";

import ScrollToTop from "./components/router/ScrollToTop";
import Header from "./components/layout/Header";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import Products from "./components/product/Products";
import Carousel from "./components/graphics/Carousel";
import Categories from "./components/product/Categories";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Alert from "./components/layout/Alert";
import Orders from "./components/orders/Orders";
import Footer from "./components/layout/Footer";

import HeaderFloatingCart from "./components/layout/HeaderFloatingCart";

let img1 = "/public/large-images/foodgrains.webp";
let img2 = "/public/large-images/kitchen.webp";
let img3 = "/public/large-images/meat.webp";
const images = [img1, img2, img3];

const App = () => {
  /*   useEffect(() => {
    // store.dispatch(loadToken());
    });
  }, []); */

  return (
    <Router>
      <Fragment>
        <ScrollToTop />
        <div className="everything-except-footer">
          <Header />
          <Route exact path="/" component={HeaderFloatingCart} />
          <Route path="/products" component={HeaderFloatingCart} />
          <Alert />

          <Route
            exact
            path="/"
            render={(props) => (
              <Carousel
                images={images}
                carouselWidth={90}
                carouselWidthUnit="vw"
              />
            )}
          />

          <Switch>
            <Route exact path="/" component={Categories} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/products/category/:category"
              component={Products}
            />
            <Route exact path="/products/search" component={Products} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/orders" component={Orders} />
            <Route render={() => <h1>404 not found</h1>} />
          </Switch>
        </div>

        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
