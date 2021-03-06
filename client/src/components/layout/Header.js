import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

import DropdownMenu from "./DropdownMenu";
import SlideMenu from "./SlideMenu";
import SearchBar from "../search/SearchBar";

import cx from "classnames";
import globalStyles from "../../Global.module.css";
import headerStyles from "./Header.module.css";
import cart from "../../icons/cart.svg";
import logo from "../../icons/logo.svg";
import slideMenuIcon from "../../icons/slide-menu.svg";
import logoutImg from "../../icons/logout.svg";
import profileImg from "../../icons/profile.svg";
import shoppingBagImg from "../../icons/shopping-bag.svg";

const Header = ({ isAuthenticated, logout, itemCount }) => {
  const dropDownItems = [
    { title: "Profile", icon: profileImg, link: "/profile" },
    { title: "Orders", icon: shoppingBagImg, link: "/orders" },
    { title: "Logout", icon: logoutImg, click: () => logout() },
  ];
  const slideMenuItems = [
    { title: "Profile", icon: profileImg, link: "/profile" },
    { title: "Orders", icon: shoppingBagImg, link: "/orders" },
    { title: "Logout", icon: logoutImg, click: () => logout() },
  ];

  const [showSlideMenu, setSlideMenu] = useState(false);
  const hideSlideMenu = () => {
    setSlideMenu(false);
  };

  return (
    <header>
      {isAuthenticated ? (
        <img
          className={cx(headerStyles.slideMenuIcon, globalStyles.mediumIcon)}
          src={slideMenuIcon}
          alt="Slide"
          onClick={() => {
            setSlideMenu(true);
          }}
        />
      ) : (
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <img
            className={cx(headerStyles.loginIcon, globalStyles.mediumIcon)}
            src={profileImg}
            alt="Login"
          />
        </Link>
      )}

      <div className={headerStyles.logoContainer}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <img className={headerStyles.logo} src={logo} alt="logo" />
        </Link>
      </div>
      <SearchBar />

      {isAuthenticated ? (
        <DropdownMenu menuTitle="My Account" dropDownItems={dropDownItems} />
      ) : (
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <button className={cx(globalStyles.btn, headerStyles.loginBtn)}>
            Login
          </button>
        </Link>
      )}

      <div className={headerStyles.cartContainer}>
        <Link to={"/cart"} style={{ textDecoration: "none" }}>
          <img className={headerStyles.cart} src={cart} alt="cart" />
          {itemCount !== 0 && (
            <div className={headerStyles.itemCount}> {itemCount}</div>
          )}
        </Link>
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
  itemCount: PropTypes.number,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
  itemCount: state.cart.length,
});

const mapDispatchToProps = {
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
