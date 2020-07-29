import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
//import { } from "../../actions/auth";
import PropTypes from "prop-types";

import Spinner from "../graphics/Spinner";
import Addresses from "./Addresses";

import cx from "classnames";
import profileStyles from "./Profile.module.css";
import globalStyles from "../../Global.module.css";

import profileImg from "../../icons/profile.svg";

import axios from "axios";

const Profile = ({ token }) => {
  const [formState, setFormState] = useState({
    savedName: "",
    name: "",
    nameError: null,
    savingName: false,
    editName: false,
    savedEmail: "",
    email: "",
    editEmail: false,
    savingEmail: false,
    emailError: null,
    mobile: "",
    profileLoading: true,
  });

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      try {
        if (token) {
          const res = await axios.get("/api/profile", config);
          const { name, email, mobile } = res.data;
          setFormState((prevState) => ({
            ...prevState,
            name,
            savedName: name,
            email,
            savedEmail: email,
            mobile: "+" + mobile,
            profileLoading: false,
          }));
        }
      } catch (err) {
        const error = err.response.data;
        console.log(error);
      }
    })();
  }, [token]);

  const {
    name,
    nameError,
    savingName,
    editName,
    email,
    editEmail,
    savingEmail,
    emailError,
    mobile,
    profileLoading,
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

    if (e.target.name === "name") {
      nextFormState.nameError = null;
    } else if (e.target.name === "email") nextFormState.emailError = null;

    setFormState(nextFormState);
  };

  const onSubmitName = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    try {
      setFormState({ ...formState, savingName: true });
      const res = await axios.put("/api/profile", { name }, config);
      setFormState({
        ...formState,
        name: res.data.name,
        savedName: res.data.name,
        savingName: false,
        editName: false,
      });
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
        });

        nextFormState.savingName = false;
        setFormState(nextFormState);
      } else {
        console.log(err);
      }
    }
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    try {
      setFormState({ ...formState, savingEmail: true });
      const res = await axios.put("/api/profile", { email }, config);
      setFormState({
        ...formState,
        email: res.data.email,
        savedEmail: res.data.email,
        savingEmail: false,
        editEmail: false,
      });
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
        });

        nextFormState.savingEmail = false;
        setFormState(nextFormState);
      } else {
        console.log(err);
      }
    }
  };

  const toggleEditName = () => {
    setFormState((prevState) => ({
      ...prevState,
      editName: !prevState.editName,
      name: prevState.savedName,
      nameError: null,
    }));
  };
  const toggleEditEmail = () => {
    setFormState((prevState) => ({
      ...prevState,
      editEmail: !prevState.editEmail,
      email: prevState.savedEmail,
      emailError: null,
    }));
  };

  let content = profileLoading ? (
    <div className={cx(globalStyles.flexCenter, globalStyles["mt-2"])}>
      <Spinner />
    </div>
  ) : (
    <Fragment>
      <form className={profileStyles.form} onSubmit={(e) => onSubmitName(e)}>
        <label className={profileStyles.label}>Name</label>
        <small
          className={cx(profileStyles.edit, globalStyles["ml-1"])}
          onClick={toggleEditName}
        >
          {editName ? "cancel" : "edit"}
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
          {editEmail ? "cancel" : "edit"}
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

  if (!token) return <Redirect to="/" />;

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
      <div className={profileStyles.addressesContainer}>
        <Addresses />
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Profile);
