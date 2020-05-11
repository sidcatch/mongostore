import React, { useEffect } from "react";

import backdropStyle from "./Backdrop.module.css";

const Backdrop = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  });

  return <div className={backdropStyle.backdrop}></div>;
};

export default Backdrop;
