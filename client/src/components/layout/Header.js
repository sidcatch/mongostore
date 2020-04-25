import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

import DropdownMenu from "./DropdownMenu";
import SlideMenu from "./SlideMenu";

import cx from "classnames";
import "../../App.css";
import globalStyles from "../../Global.module.css";
import headerStyles from "./Header.module.css";
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
    { title: "Logout", icon: logoutImg, click: () => logout() },
  ];
  const slideMenuItems = [
    { title: "Profile", icon: profileImg },
    { title: "Orders", icon: shoppingBagImg },
    { title: "Logout", icon: logoutImg, click: () => logout() },
  ];

  const [showSlideMenu, setSlideMenu] = useState(false);
  const hideSlideMenu = () => {
    setSlideMenu(false);
  };
  return (
    <header>
      <img
        className={cx(headerStyles.slideMenuIcon, globalStyles.mediumIcon)}
        src={slideMenuIcon}
        alt="Slide"
        onClick={() => {
          setSlideMenu(true);
        }}
      />
      <div className={headerStyles.logoContainer}>
        <img className={headerStyles.logo} src={logo} alt="logo" />
      </div>

      {isAuthenticated ? (
        <DropdownMenu menuTitle="My Account" dropDownItems={dropDownItems} />
      ) : (
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <button className={globalStyles.btn}>Login</button>
        </Link>
      )}

      <div>
        <img className={headerStyles.cart} src={cart} alt="cart" />
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
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = {
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
