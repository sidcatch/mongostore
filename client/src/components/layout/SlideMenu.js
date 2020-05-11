import React, { useEffect, Fragment } from "react";
import { CSSTransition } from "react-transition-group";

import SlideMenuItem from "./SlideMenuItem";
import Backdrop from "./Backdrop";

import "../../App.css";
import cx from "classnames";
import slideMenuStyles from "./SlideMenu.module.css";
import globalStyles from "../../Global.module.css";
import backImg from "../../icons/back.svg";

const SlideMenu = ({
  menuTitle,
  slideMenuItems,
  showSlideMenu,
  hideSlideMenu,
}) => {
  useEffect(() => {
    if (showSlideMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [showSlideMenu]);

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
        // classNames="slide-menu"
        classNames={{
          enter: slideMenuStyles["slide-menu-enter"],
          enterActive: slideMenuStyles["slide-menu-enter-active"],
          exit: slideMenuStyles["slide-menu-exit"],
          exitActive: slideMenuStyles["slide-menu-exit-active"],
        }}
      >
        <div className={slideMenuStyles["slide-menu"]}>
          <span className={slideMenuStyles.slideMenuTitle}>
            <img
              className={cx(globalStyles.mediumIcon, globalStyles.backIcon)}
              src={backImg}
              alt="back"
              onClick={() => {
                hideSlideMenu();
              }}
            />
            {menuTitle}
          </span>

          <ul className={slideMenuStyles.slideMenuList}>
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

          <ul className={globalStyles.testList}>
            <li>Hey</li>
            <li>Hey</li>
            <li>Hey</li>
            <li>Hey</li>
            <li>Hey</li>
            <li>Hey</li>
          </ul>
        </div>
      </CSSTransition>
    </Fragment>
  );
};

export default SlideMenu;
