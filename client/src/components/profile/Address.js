import React, { Fragment, useState } from "react";

import cx from "classnames";
import addressStyles from "./AddressForm.module.css";
import globalStyles from "../../Global.module.css";

import profileImg from "../../icons/profile.svg";

import axios from "axios";

//can become a form or simply a display. reuse this in checkout
const Address = () => {
  const token = localStorage.getItem("token");

  const [formState, setFormState] = useState({
    name: "",
    nameError: null,
    email: "",
    emailError: null,
    mobile: "",
    mobileError: null,
    address: "",
    city: "",
    state: "",
    pincode: "",
    saving: false,
  });

  const {
    name,
    nameError,
    email,
    emailError,
    mobile,
    mobileError,
    address,
    city,
    state,
    pincode,
    saving,
  } = formState;

  const onChange = (e) => {
    if (e.target.name === "name") {
      let specialCharacter = /[^a-zA-Z0-9 ]/;
      let startsWithNumber = /^[0-9]/;

      if (e.target.value.match(specialCharacter)) return;
      if (e.target.value.match(startsWithNumber)) return;
    }
    if (e.target.name === "email") {
    }

    let nextFormState = { ...formState, [e.target.name]: e.target.value };

    if (e.target.name === "name") nextFormState.nameError = null;
    else if (e.target.name === "email") nextFormState.emailError = null;
    else if (e.target.name === "mobile") nextFormState.mobileError = null;

    setFormState(nextFormState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    try {
      setFormState({ ...formState, saving: true });
      //const res = await axios.put("/api/profile", { name }, config);
      setFormState({
        saving: false,
      });
      //hide form
    } catch (err) {
      const errors = err.response.data.errors;

      console.log(errors);
      if (errors) {
        let nextFormState = { ...formState };
        errors.forEach((error) => {
          //We show only one name or email error at a time
          if (error.param === "name" && !nextFormState.nameError)
            nextFormState.nameError = error.msg;
          else if (error.param === "email" && !nextFormState.emailError)
            nextFormState.emailError = error.msg;
          else if (error.param === "mobile" && !nextFormState.mobileError)
            nextFormState.mobileError = error.msg;
        });

        nextFormState.saving = false;
        setFormState(nextFormState);
      } else {
        console.log(err);
      }
    }
  };

  let content = (
    <Fragment>
      <form className={profileStyles.form} onSubmit={(e) => onSubmitName(e)}>
        <label className={profileStyles.label}>Name</label>
        <small
          className={cx(profileStyles.edit, globalStyles["ml-1"])}
          onClick={toggleEditName}
        >
          {editName ? "cancle" : "edit"}
        </small>
        <div className={cx(profileStyles.errorContainer)}>
          <small>{nameError}</small>
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={name}
            autoComplete="off"
            onChange={(e) => onChange(e)}
            className={cx({ [profileStyles.readOnly]: !editName })}
            readOnly={!editName}
          />
          {editName &&
            (savingName ? (
              <Spinner
                height="2.8rem"
                verticalAlign="bottom"
                margin="0rem 0rem 0rem 2rem"
              />
            ) : (
              <input
                type="submit"
                className={cx(globalStyles.btn, globalStyles["ml-2"])}
                value="save"
              />
            ))}
        </div>
      </form>
      <form className={profileStyles.form} onSubmit={(e) => onSubmitEmail(e)}>
        <label className={profileStyles.label}>Email</label>
        <small
          className={cx(profileStyles.edit, globalStyles["ml-1"])}
          onClick={toggleEditEmail}
        >
          {editEmail ? "cancle" : "edit"}
        </small>
        <div className={cx(profileStyles.errorContainer)}>
          <small>{emailError}</small>
        </div>
        <div>
          <input
            type="text"
            name="email"
            value={email}
            autoComplete="off"
            onChange={(e) => onChange(e)}
            className={cx({ [profileStyles.readOnly]: !editEmail })}
            readOnly={!editEmail}
          />
          {editEmail &&
            (savingEmail ? (
              <Spinner
                height="2.8rem"
                verticalAlign="bottom"
                margin="0rem 0rem 0rem 2rem"
              />
            ) : (
              <input
                type="submit"
                className={cx(globalStyles.btn, globalStyles["ml-2"])}
                value="save"
              />
            ))}
        </div>
      </form>
      <form className={profileStyles.form}>
        <label className={profileStyles.label}>Mobile Number</label>
        <div
          className={cx(
            profileStyles.errorContainer,
            globalStyles["ml-point5"]
          )}
        >
          <small>{}</small>
        </div>
        <div>
          <input
            type="text"
            name="mobile"
            value={mobile}
            autoComplete="off"
            onChange={(e) => onChange(e)}
            className={profileStyles.readOnly}
            readOnly
          />
        </div>
      </form>
    </Fragment>
  );

  return (
    <Fragment>
      <section className={profileStyles.formContainer}>
        <h1 className={cx(globalStyles.large, globalStyles["mt-1point5"])}>
          <img
            className={cx(globalStyles.largeIcon, globalStyles["mr-1"])}
            style={{ verticalAlign: "top" }}
            src={profileImg}
            alt="profile"
          />
          Profile
        </h1>
        {content}
      </section>
    </Fragment>
  );
};

export default Address;
