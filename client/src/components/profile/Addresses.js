import React, { Fragment } from "react";

import Address from "./Address";
import addressStyles from "./Address.module.css";

//can become a form or simply a display. reuse this in checkout
const Addresses = () => {
  return (
    <Fragment>
      <h2 id={addressStyles.manageAddresses}>Manage Addresses</h2>
      <div className={addressStyles.addresses}>
        <Address />
        <Address />
      </div>
    </Fragment>
  );
};

export default Addresses;
