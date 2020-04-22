import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../actions/auth";
import PropTypes from "prop-types";
import axios from "axios";

import Backdrop from "../layout/Backdrop";
import Spinner from "../graphics/Spinner";

import "../../App.css";
import close from "../../icons/close.svg";

const SignUp = ({ isAuthenticated, loading, signup }) => {
  const [formState, setFormState] = useState({
    showContinueButton: true,
    showOnlyMobileField: true,
    mobile: "",
    mobileError: null,
    password: "",
    password2: "",
    passwordError: null,
    oneTimePassword: "",
    otpError: null
  });

  const {
    showContinueButton,
    showOnlyMobileField,
    mobile,
    password,
    password2,
    mobileError,
    passwordError,
    oneTimePassword,
    otpError
  } = formState;

  const onChange = e => {
    let nextFormState = { ...formState, [e.target.name]: e.target.value };

    if (e.target.name === "mobile") {
      nextFormState.mobileError = null;
    } else if (e.target.name === "password" || e.target.name === "password2")
      nextFormState.passwordError = null;
    else if (e.target.name === "oneTimePassword") nextFormState.otpError = null;

    setFormState(nextFormState);
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (showOnlyMobileField) {
      //axios
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      try {
        setFormState({ ...formState, showContinueButton: false });
        await axios.post("/auth/receiveotp", { mobile }, config);
        setFormState({ ...formState, showOnlyMobileField: false });
      } catch (err) {
        const errors = err.response.data.errors;

        console.log(errors);
        if (errors) {
          let nextFormState = { ...formState };
          errors.forEach(error => {
            //We show only one mobile error at a time
            if (error.param === "mobile") nextFormState.mobileError = error.msg;
          });
          setFormState(nextFormState);
        }
      }
    } else {
      if (password !== password2) {
        setFormState({
          ...formState,
          passwordError: "Passwords do not match"
        });
      } else {
        signup(formState, setFormState);
      }
    }
  };

  if (isAuthenticated) return <Redirect to="/" />;

  let content = null;

  if (showOnlyMobileField) {
    content = (
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="error-container ml-point5">
          <small>{mobileError}</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Mobile number"
            name="mobile"
            value={mobile}
            onChange={e => onChange(e)}
            /* required */
          />
        </div>
        {showContinueButton && (
          <div className="mt-point5">
            <input type="submit" className="btn btn-primary" value="Continue" />
          </div>
        )}
      </form>
    );
  } else {
    content = loading ? (
      <div className="flex-center  mt-2">
        <Spinner />
      </div>
    ) : (
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="error-container ml-point5">
          <small>{mobileError}</small>
        </div>
        <div className="form-group">
          <input
            className="read-only"
            type="text"
            placeholder="Mobile number"
            name="mobile"
            value={mobile}
            onChange={e => onChange(e)}
            readOnly
            /* required */
          />
        </div>
        <div className="error-container ml-point5">
          <small>{otpError}</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter OTP sent to Mobile"
            name="oneTimePassword"
            value={oneTimePassword}
            onChange={e => onChange(e)}
            /* required */
          />
        </div>
        <div className="error-container ml-point5">
          <small>{passwordError}</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            /* minlenth="3" */
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            /* minlenth="3" */
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Sign Up" />
      </form>
    );
  }

  return (
    <Fragment>
      <Link to={"/"}>
        <Backdrop />
      </Link>

      <div className="prompt">
        <Link to={"/"}>
          <div className="close-container">
            <img className="close" src={close} alt="close"></img>
          </div>
        </Link>

        <section className="form-container">
          <h1 className="large mt-1point5">Sign Up</h1>
          {content}
        </section>
      </div>
    </Fragment>
  );
};

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  loading: state.auth.loading
});

const mapDispatchToProps = {
  signup
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
