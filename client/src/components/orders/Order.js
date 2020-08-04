import React, { Fragment } from "react";
//import { Link } from "react-router-dom";

import Item from "./Item";

import cx from "classnames";
import ordersStyles from "./Orders.module.css";
import globalStyles from "../../Global.module.css";

import dropdownCloseImg from "../../icons/dropdown-close.svg";
import dropdownOpenImg from "../../icons/dropdown-open.svg";

//can become a form or simply a display. reuse this in checkout
const Columns = () => {
  return (
    <Fragment>
      <div className={ordersStyles.order}>
        <div className={ordersStyles.statusIcon}></div>
        <p className={ordersStyles.status}>Arriving On</p>
        <p className={ordersStyles.time}>2020/3/21</p>
        <p className={ordersStyles.amount}>Amount : ₹500</p>
        <p className={ordersStyles.noOfItems}>5 items</p>
        <img
          className={cx(
            ordersStyles.dropdownCloseOpenIcon,
            globalStyles.smallIcon
          )}
          src={/* showDropdown ? dropdownOpenImg :  */ dropdownCloseImg}
          alt="down-arrow"
        />
      </div>
      <Item title={"Refined Oil"} price={108} quantity={1} />
      <Item title={"Refined Oil"} price={108} quantity={1} />
      <Item title={"Refined Oil"} price={108} quantity={1} />
      <Item title={"Refined Oil"} price={108} quantity={1} />
    </Fragment>
  );
};

export default Columns;
