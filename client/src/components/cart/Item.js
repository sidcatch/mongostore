import React, { Fragment, useState } from "react";
//import { Link } from "react-router-dom";

import cartStyles from "./Cart.module.css";

//can become a form or simply a display. reuse this in checkout
const Item = () => {
  const [item /* , setItem */] = useState({
    title: "Steel Cook and Serve Set",
    price: 500,
    quantity: 3,
  });
  const { title, price, quantity } = item;
  return (
    <Fragment>
      <ul className={cartStyles.item}>
        <li className={cartStyles.title}>{title}</li>
        <li className={cartStyles.price}>₹{price}</li>
        <li className={cartStyles.quantity}>
          <button className={cartStyles.decrement}>-</button>
          <span className={cartStyles.qty}>{quantity}</span>

          <button className={cartStyles.increment}>+</button>
        </li>
        <li className={cartStyles.subTotal}>₹{price * quantity}</li>
      </ul>
    </Fragment>
  );
};

export default Item;
