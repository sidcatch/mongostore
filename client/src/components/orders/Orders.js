import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
//import { emptyCart } from "../../actions/cart";
import PropTypes from "prop-types";

import Order from "./Order";
import Spinner from "../graphics/Spinner";

import cx from "classnames";
import ordersStyles from "./Orders.module.css";
import globalStyles from "../../Global.module.css";

import axios from "axios";

import shoppingBagImg from "../../icons/shopping-bag.svg";

//can become a form or simply a display. reuse this in checkout
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [ordersState, setOrdersState] = useState({ loading: true });

  let { loading } = ordersState;

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      try {
        if (token) {
          const res = await axios.get("/api/order/all", config);
          setOrders(res.data);
          setOrdersState((prevState) => ({ ...prevState, loading: false }));
        }
      } catch (err) {
        console.log(err);
        if (err.response) {
          const error = err.response.data;
          console.log(error);
        }
      }
    })();
  }, [token]);

  if (loading)
    return (
      <Fragment>
        <div className={cx(globalStyles.flexCenter)}>
          <Spinner />
        </div>
      </Fragment>
    );

  if (!token) return <Redirect to="/" />;

  return (
    <Fragment>
      <h1 className={cx(globalStyles.large, globalStyles["mt-1point5"])}>
        <img
          className={cx(globalStyles.largeIcon, globalStyles["mr-1"])}
          style={{ verticalAlign: "top" }}
          src={shoppingBagImg}
          alt="profile"
        />
        Orders
      </h1>
      <div className={ordersStyles.orders}>
        {orders.map(
          ({
            _id,
            status,
            items,
            totalAmount,
            paymentMethod,
            estimatedArrivalDate,
          }) => (
            <Order
              status={status}
              estimatedArrivalDate={estimatedArrivalDate}
              totalAmount={totalAmount}
              items={items}
              paymentMethod={paymentMethod}
              key={_id}
            />
          )
        )}
      </div>
    </Fragment>
  );
};

Orders.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Orders);
