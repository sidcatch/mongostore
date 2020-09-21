import React from "react";
import { Link } from "react-router-dom";

import cx from "classnames";
import slideMenuItemStyles from "./SlideMenuItem.module.css";
import globalStyles from "../../Global.module.css";

const SlideMenuItem = ({ icon, title, link, click }) => {
  if (link) {
    return (
      <Link to={link} style={{ textDecoration: "none" }}>
        <li className={slideMenuItemStyles.slideMenuItem}>
          <img
            className={cx(
              globalStyles.smallIcon,
              slideMenuItemStyles.slideMenuIcon
            )}
            src={icon}
            alt=""
          />
          <span className={slideMenuItemStyles.slidMenuText}>{title}</span>
        </li>
      </Link>
    );
  } else if (click) {
    return (
      <li className={slideMenuItemStyles.slideMenuItem} onClick={() => click()}>
        <img
          className={cx(
            globalStyles.smallIcon,
            slideMenuItemStyles.slideMenuIcon
          )}
          src={icon}
          alt=""
        />
        <span className={slideMenuItemStyles.slidMenuText}>{title}</span>
      </li>
    );
  } else {
    return (
      <li className={slideMenuItemStyles.slideMenuItem}>
        <img
          className={cx(
            globalStyles.smallIcon,
            slideMenuItemStyles.slideMenuIcon
          )}
          src={icon}
          alt=""
        />
        <span className={slideMenuItemStyles.slidMenuText}>{title}</span>
      </li>
    );
  }
};

export default SlideMenuItem;
