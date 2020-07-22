import React, { Fragment, useState } from "react";

import cx from "classnames";
import creditCardStyles from "./CreditCard.module.css";
import globalStyles from "../../Global.module.css";

/*
import axios from "axios"; */

const CreditCard = () => {
  //const token = localStorage.getItem("token");

  const [formState, setFormState] = useState({
    name: "Abdualla",
    cardNumber: "3453 4543 3423 3232",
    expiryDate: "8/12",
    cvv: "111",
    pincode: "50000",
    saving: false,
  });

  const {
    name,
    cardNumber,
    expiryDate,
    cvv,
    pincode,
    //saving,
  } = formState;

  const onChange = (e) => {
    let nextFormState = { ...formState, [e.target.name]: e.target.value };
    setFormState(nextFormState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    /* const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }; */
    try {
      setFormState({ ...formState, saving: true });
      //const res = await axios.put("/api/profile", { name }, config);
      setFormState({
        saving: false,
        showForm: false,
      });
    } catch (err) {
      setFormState({
        saving: false,
      });

      console.log(err);
    }
  };

  let form = (
    <Fragment>
      <form className={creditCardStyles.form} onSubmit={(e) => onSubmit(e)}>
        <div className={creditCardStyles.nameField}>
          <label className={creditCardStyles.label}>Name on Card</label>
          <input
            type="text"
            name="name"
            value={name}
            autoComplete="off"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={creditCardStyles.cardNumberField}>
          <label className={creditCardStyles.label}>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={cardNumber}
            autoComplete="off"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={creditCardStyles.expiryAndCVV}>
          <div className={creditCardStyles.expiryField}>
            <label className={creditCardStyles.label}>Expiry date</label>
            <input
              type="text"
              name="expiryDate"
              value={expiryDate}
              autoComplete="off"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={creditCardStyles.cvvField}>
            <label className={creditCardStyles.label}>CVV</label>
            <input
              type="text"
              name="cvv"
              value={cvv}
              autoComplete="off"
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className={creditCardStyles.pincodeField}>
          <label className={creditCardStyles.label}>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={pincode}
            autoComplete="off"
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          className={cx(globalStyles.btn, creditCardStyles.submit)}
          value="save"
        />
      </form>
    </Fragment>
  );

  return (
    <Fragment>
      <section className={creditCardStyles.creditCardContainer}>{form}</section>
    </Fragment>
  );
};

export default CreditCard;
