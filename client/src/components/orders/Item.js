import React, { Fragment } from "react";

import ordersStyles from "./Orders.module.css";

const Item = ({ title, price, quantity }) => {
  return (
    <Fragment>
      <ul className={ordersStyles.item}>
        <li className={ordersStyles.title}>{title}</li>
        <li className={ordersStyles.price}>₹{price}</li>
        <li className={ordersStyles.quantity}>{quantity}</li>
        <li className={ordersStyles.subTotal}>₹{price * quantity}</li>
      </ul>
    </Fragment>
  );
};

export default Item;
