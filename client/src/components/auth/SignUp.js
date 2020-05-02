import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";
import PropTypes from "prop-types";
import axios from "axios";

import Backdrop from "../layout/Backdrop";
import Spinner from "../graphics/Spinner";

import cx from "classnames";
import formStyles from "../Form.module.css";
import globalStyles from "../../Global.module.css";
import close from "../../icons/close.svg";

const SignUp = ({ isAuthenticated, loading, signup }) => {
  const [formState, setFormState] = useState({
    showContinueButton: true,
    showOnlyMobileInputField: true,
    mobile: "",
    mobileError: null,
    password: "",
    password2: "",
    passwordError: null,
    oneTimePassword: "",
    otpError: null,
  });

  const {
    showContinueButton,
    showOnlyMobileInputField,
    mobile,
    password,
    password2,
    mobileError,
    passwordError,
    oneTimePassword,
    otpError,
  } = formState;

  const onChange = (e) => {
    if (e.target.name === "mobile") {
      let validNumber = /^\+91\d*$/;
      let hasOneCharacter = e.target.value.length === 1 ? true : false;

      if (hasOneCharacter) e.target.value = "+91" + e.target.value;
      if (!e.target.value.match(validNumber)) return;
    } else if (e.target.name === "oneTimePassword") {
      //let isNumber = /^\d*$/;
      //if (!e.target.value.match(isNumber)) return;
      if (isNaN(e.target.value)) return;
    }

    let nextFormState = {
      ...formState,
      [e.target.name]: e.target.value,
    };

    if (e.target.name === "mobile") {
      nextFormState.mobileError = null;
    } else if (e.target.name === "password" || e.target.name === "password2")
      nextFormState.passwordError = null;
    else if (e.target.name === "oneTimePassword") nextFormState.otpError = null;

    setFormState(nextFormState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (showOnlyMobileInputField) {
      //axios
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        setFormState({ ...formState, showContinueButton: false });
        await axios.post("/auth/receiveotp", { mobile }, config);
        setFormState({ ...formState, showOnlyMobileInputField: false });
      } catch (err) {
        const errors = err.response.data.errors;

        console.log(errors);
        if (errors) {
          let nextFormState = { ...formState };
          errors.forEach((error) => {
            //We show only one mobile error at a time
            if (error.param === "mobile") nextFormState.mobileError = error.msg;
          });
          setFormState(nextFormState);
        }
      }
    } else {
      /* if (password !== password2) {
        setFormState({
          ...formState,
          passwordError: "Passwords do not match",
        });
      } else { */
      signup(formState, setFormState);
      //}
    }
  };

  if (isAuthenticated) return <Redirect to="/" />;

  let content = null;

  if (showOnlyMobileInputField) {
    content = (
      <form className={formStyles.form} onSubmit={(e) => onSubmit(e)}>
        <div
          className={cx(formStyles.errorContainer, globalStyles["ml-point5"])}
        >
          <small>{mobileError}</small>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter mobile number"
            name="mobile"
            value={mobile}
            onChange={(e) => onChange(e)}
            /* required */
          />
        </div>
        {showContinueButton ? (
          <div className={globalStyles["mt-point5"]}>
            <input
              type="submit"
              className={globalStyles.btn}
              value="Continue"
            />
          </div>
        ) : (
          <div className={cx(globalStyles.flexCenter, globalStyles["mt-2"])}>
            <Spinner />
          </div>
        )}
      </form>
    );
  } else {
    content = loading ? (
      <div className={cx(globalStyles.flexCenter, globalStyles["mt-2"])}>
        <Spinner />
      </div>
    ) : (
      <form className={formStyles.form} onSubmit={(e) => onSubmit(e)}>
        <div
          className={cx(formStyles.errorContainer, globalStyles["ml-point5"])}
        >
          <small>{mobileError}</small>
        </div>
        <div>
          <input
            className={globalStyles.readOnly}
            type="text"
            placeholder="Mobile number"
            name="mobile"
            value={mobile}
            onChange={(e) => onChange(e)}
            readOnly
            /* required */
          />
        </div>
        <div
          className={cx(formStyles.errorContainer, globalStyles["ml-point5"])}
        >
          <small>{otpError}</small>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter OTP sent to Mobile"
            name="oneTimePassword"
            value={oneTimePassword}
            onChange={(e) => onChange(e)}
            /* required */
          />
        </div>
        <div
          className={cx(formStyles.errorContainer, globalStyles["ml-point5"])}
        >
          <small>{passwordError}</small>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            /* minlenth="3" */
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            /* minlenth="3" */
          />
        </div>
        <input type="submit" className={globalStyles.btn} value="Sign Up" />
      </form>
    );
  }

  return (
    <Fragment>
      <Link to={"/"}>
        <Backdrop />
      </Link>

      <div className={globalStyles.prompt}>
        <Link to={"/"}>
          <div className={globalStyles.closeContainer}>
            <img className={globalStyles.close} src={close} alt="close"></img>
          </div>
        </Link>

        <section className={formStyles.formContainer}>
          <h1 className={cx(globalStyles.large, globalStyles["mt-1point5"])}>
            Sign Up
          </h1>
          {content}
        </section>
      </div>
    </Fragment>
  );
};

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
  loading: state.auth.loading,
});

const mapDispatchToProps = {
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
