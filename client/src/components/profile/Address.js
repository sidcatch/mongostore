import React, { Fragment } from "react";

import cx from "classnames";
import globalStyles from "../../Global.module.css";
import addressStyles from "./Address.module.css";

import Spinner from "../graphics/Spinner";
/*
import axios from "axios"; */

const Address = ({
  id,
  name,
  mobile,
  address,
  city,
  state,
  pincode,
  editable,
  edit,
  loading,
  hasEmptyField,
  onChange,
  onSubmit,
  toggleEdit,
  deletable,
  onDelete,
}) => {
  const noSubmit = (e) => {
    // e.persist();
    e.preventDefault();
  };

  let form = (
    <Fragment>
      <form
        className={addressStyles.form}
        onSubmit={(e) => {
          !hasEmptyField ? onSubmit(e, id) : noSubmit(e);
        }}
      >
        <div className={addressStyles.editContainer}>
          <small
            className={cx(addressStyles.edit)}
            onClick={(e) => toggleEdit(e, id)}
          >
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
              onChange={(e) => onChange(e, id)}
            />
          </div>
          <div className={addressStyles.mobileField}>
            <label className={addressStyles.label}>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              autoComplete="off"
              onChange={(e) => onChange(e, id)}
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
            onChange={(e) => onChange(e, id)}
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
              onChange={(e) => onChange(e, id)}
            />
          </div>
          <div className={addressStyles.stateField}>
            <label className={addressStyles.label}>State</label>
            <input
              type="text"
              name="state"
              value={state}
              autoComplete="off"
              onChange={(e) => onChange(e, id)}
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
            onChange={(e) => onChange(e, id)}
          />
        </div>
        <input
          type="submit"
          className={cx(
            { [globalStyles.inactiveBtn]: hasEmptyField },
            { [globalStyles.btn]: !hasEmptyField },
            addressStyles.submit
          )}
          value="save"
        />
        {deletable && (
          <small
            className={cx(addressStyles.edit, addressStyles.delete)}
            onClick={() => onDelete(id)}
          >
            delete
          </small>
        )}
      </form>
    </Fragment>
  );

  let addressDisplay = (
    <Fragment>
      <div className={addressStyles.addressDisplay}>
        {editable && (
          <div className={addressStyles.editContainer}>
            <small
              className={cx(addressStyles.edit)}
              onClick={(e) => toggleEdit(e, id)}
            >
              edit
            </small>
          </div>
        )}

        <p className={addressStyles.nameAndMobile}>
          {name} {mobile}
        </p>

        <address className={addressStyles.address}>
          {address}, {city}, {state}
        </address>
        <p className={addressStyles.pincode}>{pincode}</p>
      </div>
    </Fragment>
  );

  if (loading)
    return (
      <Fragment>
        <div className={cx(globalStyles.flexCenter)}>
          <Spinner />
        </div>
      </Fragment>
    );

  return <Fragment>{edit ? form : addressDisplay}</Fragment>;
};

Address.defaultProps = {
  deletable: true,
};

export default Address;
