import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

import Backdrop from "../layout/Backdrop";
import Spinner from "../graphics/Spinner";

import cx from "classnames";
import formStyles from "../Form.module.css";
import globalStyles from "../../Global.module.css";
import close from "../../icons/close.svg";

const Login = ({ isAuthenticated, loading, login }) => {
  //console.log(window.location.pathname.replace(/^\/login/, ""));
  //console.log(match.url);

  const [formState, setFormState] = useState({
    mobile: "",
    mobileError: null,
    password: "",
    passwordError: null,
  });

  const { mobile, mobileError, password, passwordError } = formState;

  const onChange = (e) => {
    if (e.target.name === "mobile") {
      let validNumber = /^\+91\d*$/;
      let hasOneCharacter = e.target.value.length === 1 ? true : false;

      if (hasOneCharacter) e.target.value = "+91" + e.target.value;
      if (!e.target.value.match(validNumber)) return;
    }

    let nextFormState = { ...formState, [e.target.name]: e.target.value };

    if (e.target.name === "mobile") {
      nextFormState.mobileError = null;
    } else if (e.target.name === "password") nextFormState.passwordError = null;

    setFormState(nextFormState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    login(formState, setFormState);
  };

  if (isAuthenticated)
    return (
      <Redirect to={`${window.location.pathname.replace(/^\/login/, "")}`} />
    );

  let content = loading ? (
    <div className={cx(globalStyles.flexCenter, globalStyles["mt-2"])}>
      <Spinner />
    </div>
  ) : (
    <form className={formStyles.form} onSubmit={(e) => onSubmit(e)}>
      <div className={cx(formStyles.errorContainer, globalStyles["ml-point5"])}>
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
      <div className={cx(formStyles.errorContainer, globalStyles["ml-point5"])}>
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
      <div className={globalStyles["mt-point5"]}>
        <input type="submit" className={globalStyles.btn} value="Login" />
      </div>

      <Link
        to={`/signup${window.location.pathname.replace(/^\/login/, "")}`}
        style={{ textDecoration: "none" }}
      >
        <div className={globalStyles["mt-1"]}>
          <small className={globalStyles.smallLink}>
            New User? Create an account
          </small>
        </div>
      </Link>
    </form>
  );

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
            Login
          </h1>
          {content}
        </section>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
  loading: state.auth.loading,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
