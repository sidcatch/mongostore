import React, { Fragment, useState } from "react";

import cx from "classnames";
import globalStyles from "../../Global.module.css";
import addressStyles from "./Address.module.css";
/*
import axios from "axios"; */

const Address = () => {
  //const token = localStorage.getItem("token");

  const [formState, setFormState] = useState({
    name: "Abdualla",
    mobile: "34534543",
    address: "3453-345-43534/5 bebe mongy Old town, laugh Road",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "50000",
    editable: true,
    edit: true,
    selectable: false,
    saving: false,
  });

  const {
    name,
    mobile,
    address,
    city,
    state,
    pincode,
    editable,
    edit,
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

  const toggleEdit = () => {
    setFormState((prevState) => ({
      ...prevState,
      edit: !prevState.edit,
    }));
  };

  let form = (
    <Fragment>
      <form className={addressStyles.form} onSubmit={(e) => onSubmit(e)}>
        <div className={addressStyles.editContainer}>
          <small className={cx(addressStyles.edit)} onClick={toggleEdit}>
            cancel
          </small>
        </div>
        <div className={addressStyles.nameAndMobile}>
          <div className={addressStyles.nameField}>
            <label className={addressStyles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              autoComplete="off"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={addressStyles.mobileField}>
            <label className={addressStyles.label}>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              autoComplete="off"
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className={addressStyles.addressField}>
          <label className={addressStyles.label}>Address</label>
          <input
            type="text"
            name="address"
            value={address}
            autoComplete="off"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={addressStyles.cityAndState}>
          <div className={addressStyles.cityField}>
            <label className={addressStyles.label}>City</label>
            <input
              type="text"
              name="city"
              value={city}
              autoComplete="off"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={addressStyles.stateField}>
            <label className={addressStyles.label}>State</label>
            <input
              type="text"
              name="state"
              value={state}
              autoComplete="off"
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className={addressStyles.pincodeField}>
          <label className={addressStyles.label}>Pincode</label>
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
          className={cx(globalStyles.btn, addressStyles.submit)}
          value="save"
        />
        <small className={cx(addressStyles.edit, addressStyles.delete)}>
          delete
        </small>
      </form>
    </Fragment>
  );

  let addressDisplay = (
    <Fragment>
      <div className={addressStyles.addressDisplay}>
        {editable && (
          <div className={addressStyles.editContainer}>
            <small className={cx(addressStyles.edit)} onClick={toggleEdit}>
              edit
            </small>
          </div>
        )}

        <p className={addressStyles.nameAndMobile}>
          {name} {mobile}
        </p>

        <address id={addressStyles.address}>
          {address}, {city}, {state}
        </address>
        <p className={addressStyles.pincode}>{pincode}</p>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <section className={addressStyles.addressContainer}>
        {edit ? form : addressDisplay}
      </section>
    </Fragment>
  );
};

export default Address;
