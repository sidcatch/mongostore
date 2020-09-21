import React, { Fragment, useState } from "react";
//import { Link } from "react-router-dom";

import Item from "./Item";

import cx from "classnames";
import ordersStyles from "./Orders.module.css";
import globalStyles from "../../Global.module.css";

import dropdownCloseImg from "../../icons/dropdown-close.svg";
import dropdownOpenImg from "../../icons/dropdown-open.svg";

//can become a form or simply a display. reuse this in checkout
const Order = ({
  status,
  estimatedArrivalDate,
  totalAmount,
  items,
  paymentMethod,
}) => {
  const [orderState, setOrderState] = useState({ showItems: false });

  let { showItems } = orderState;

  const toggleShowItems = () => {
    setOrderState((prevState) => ({
      ...prevState,
      showItems: !prevState.showItems,
    }));
  };

  return (
    <Fragment>
      <div className={ordersStyles.order} onClick={toggleShowItems}>
        <div className={ordersStyles.statusIcon}></div>
        <p className={ordersStyles.status}>{status}</p>
        <p className={ordersStyles.time}>
          {estimatedArrivalDate.split("T")[0]}
        </p>
        <p className={ordersStyles.amount}>
          {/* Amount :  */}₹{totalAmount}
        </p>
        <p className={ordersStyles.noOfItems}>{items.length} items</p>
        <p className={ordersStyles.payment}>{paymentMethod}</p>
        <img
          className={cx(
            ordersStyles.dropdownCloseOpenIcon,
            globalStyles.smallIcon
          )}
          src={showItems ? dropdownOpenImg : dropdownCloseImg}
          alt="down-arrow"
        />
      </div>

      {showItems &&
        items.map(({ title, quantity, price, _id }) => (
          <Item title={title} price={price} quantity={quantity} key={_id} />
        ))}
    </Fragment>
  );
};

export default Order;
