import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

import Backdrop from "../layout/Backdrop";
import Spinner from "../graphics/Spinner";

import "../../App.css";
import close from "../../icons/close.svg";

const Login = ({ isAuthenticated, loading, login }) => {
  const [formState, setFormState] = useState({
    mobileOrEmail: "",
    mobileOrEmailError: null,
    password: "",
    passwordError: null
  });

  const {
    mobileOrEmail,
    mobileOrEmailError,
    password,
    passwordError
  } = formState;

  const onChange = e => {
    let nextFormState = { ...formState, [e.target.name]: e.target.value };

    if (e.target.name === "mobileOrEmail") {
      nextFormState.mobileOrEmailError = null;
    } else if (e.target.name === "password") nextFormState.passwordError = null;

    setFormState(nextFormState);
  };

  const onSubmit = async e => {
    e.preventDefault();

    login(formState, setFormState);
  };

  if (isAuthenticated) return <Redirect to="/" />;

  let content = loading ? (
    <div className="flex-center  mt-2">
      <Spinner />
    </div>
  ) : (
    <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="error-container ml-point5">
        <small>{mobileOrEmailError}</small>
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter Mobile or Email"
          name="mobileOrEmail"
          value={mobileOrEmail}
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
      <div className="mt-point5">
        <input type="submit" className="btn btn-primary" value="Login" />
      </div>

      <Link to={"/signup"} style={{ textDecoration: "none" }}>
        <div className="mt-1">
          <small className="small-link">New User? Create an account</small>
        </div>
      </Link>
    </form>
  );

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
          <h1 className="large mt-1point5">Login</h1>
          {content}
        </section>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  loading: state.auth.loading
});

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
