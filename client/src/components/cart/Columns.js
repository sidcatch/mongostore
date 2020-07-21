import React, { Fragment } from "react";
//import { Link } from "react-router-dom";

import cartStyles from "./Cart.module.css";

//can become a form or simply a display. reuse this in checkout
const Columns = () => {
  return (
    <Fragment>
      <div className={cartStyles.heading}>
        <h2 className={cartStyles.itemHeading}>ITEM</h2>
        <h2 className={cartStyles.priceHeading}>UNIT PRICE</h2>
        <h2 className={cartStyles.quantityHeading}>QUANTITY</h2>
        <h2 className={cartStyles.totalHeading}>SUB TOTAL</h2>
      </div>
    </Fragment>
  );
};

export default Columns;
