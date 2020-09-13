import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import cx from "classnames";
import headerFloatingCartStyles from "./HeaderFloatingCart.module.css";
import cart from "../../icons/cart.svg";

const HeaderFloatingCart = ({ itemCount }) => {
  const [showFloatingCart, setFloatingCart] = useState(false);
  useEffect(
    () => {
      let handleScroll = () => {
        if (window.pageYOffset > 20 /* && itemCount !== 0 */)
          setFloatingCart(true);
        else setFloatingCart(false);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    },
    [
      /* itemCount */
    ]
  );
  /* const onButtonClick = () => {
    setFloatingCart((prevState) => !prevState);
  }; */
  return (
    <div
      className={headerFloatingCartStyles.header} /* onClick={onButtonClick} */
    >
      <div className={headerFloatingCartStyles.cartContainerContainer}>
        <div
          className={cx(headerFloatingCartStyles.cartContainer, {
            [headerFloatingCartStyles.showCartContainer]: showFloatingCart,
          })}
        >
          <Link to={"/cart"} style={{ textDecoration: "none" }}>
            <img
              className={headerFloatingCartStyles.cart}
              src={cart}
              alt="cart"
            />
            {itemCount !== 0 && (
              <div className={headerFloatingCartStyles.itemCount}>
                {itemCount}
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

HeaderFloatingCart.propTypes = {
  itemCount: PropTypes.number,
};

const mapStateToProps = (state) => ({
  itemCount: state.cart.length,
});

export default connect(mapStateToProps)(HeaderFloatingCart);
