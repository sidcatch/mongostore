import React from "react";

/* import cx from "classnames";
import globalStyles from "../../Global.module.css";
import footerStyles from "./Footer.module.css"; */

const Footer = () => {
  return (
    <footer>
      <a href="http://localhost:3000/">Home</a>
      <a
        href="http://localhost:3000/"
        target="_blank"
        rel="noopener noreferrer"
      >
        About
      </a>
      <a
        href="http://localhost:3000/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contact
      </a>
    </footer>
  );
};

export default Footer;
