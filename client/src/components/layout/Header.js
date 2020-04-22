import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

import DropdownMenu from "./DropdownMenu";
import SlideMenu from "./SlideMenu";

import "../../App.css";
import cart from "../../icons/cart.svg";
import logo from "../../icons/logo.svg";
import slideMenuIcon from "../../icons/slide-menu.svg";
import logoutImg from "../../icons/logout.svg";
import profileImg from "../../icons/profile.svg";
import shoppingBagImg from "../../icons/shopping-bag.svg";

const Header = ({ isAuthenticated, logout }) => {
  const dropDownItems = [
    { title: "Profile", icon: profileImg },
    { title: "Orders", icon: shoppingBagImg },
    { title: "Logout", icon: logoutImg, click: () => logout() }
  ];
  const slideMenuItems = [
    { title: "Profile", icon: profileImg },
    { title: "Orders", icon: shoppingBagImg },
    { title: "Logout", icon: logoutImg, click: () => logout() }
  ];

  const [showSlideMenu, setSlideMenu] = useState(false);
  const hideSlideMenu = () => {
    setSlideMenu(false);
  };
  return (
    <header>
      <img
        className="slide-menu-icon medium-icon"
        src={slideMenuIcon}
        alt="Slide"
        onClick={() => {
          setSlideMenu(true);
        }}
      />
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
      </div>

      {isAuthenticated ? (
        <div /* className="mr-2" */>
          <DropdownMenu menuTitle="My Account" dropDownItems={dropDownItems} />
        </div>
      ) : (
        <div /* className="mr-2" */>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      )}

      <div className="cart-container">
        <img className="cart" src={cart} alt="cart" />
      </div>
      <SlideMenu
        menuTitle=""
        slideMenuItems={slideMenuItems}
        showSlideMenu={showSlideMenu}
        hideSlideMenu={hideSlideMenu}
      />
    </header>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = {
  logout
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
