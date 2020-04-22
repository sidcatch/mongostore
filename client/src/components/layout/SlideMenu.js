import React, { useEffect, Fragment } from "react";
import { CSSTransition } from "react-transition-group";

import SlideMenuItem from "./SlideMenuItem";
import Backdrop from "./Backdrop";

import "../../App.css";
import backImg from "../../icons/back.svg";

const SlideMenu = ({
  menuTitle,
  slideMenuItems,
  showSlideMenu,
  hideSlideMenu
}) => {
  useEffect(() => {
    if (showSlideMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  });

  return (
    <Fragment>
      {showSlideMenu && (
        <div
          onClick={() => {
            hideSlideMenu();
          }}
        >
          <Backdrop />
        </div>
      )}
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showSlideMenu}
        timeout={200}
        classNames="slide-menu"
      >
        <div className="slide-menu">
          <span className="slide-menu-title">
            <img
              className="medium-icon back-icon"
              src={backImg}
              alt="back"
              onClick={() => {
                hideSlideMenu();
              }}
            />
            {menuTitle}
          </span>

          <ul className="slide-menu-list">
            {slideMenuItems.map(({ title, icon, click, link }, index) => (
              <SlideMenuItem
                title={title}
                icon={icon}
                click={click}
                link={link}
                key={index}
              />
            ))}
          </ul>
        </div>
      </CSSTransition>
    </Fragment>
  );
};

export default SlideMenu;
