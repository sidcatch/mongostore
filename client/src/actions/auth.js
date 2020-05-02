import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_TOKEN,
  LOGOUT,
} from "./types";
import axios from "axios";

//Load token from localStorage
export const loadToken = () => (dispatch) => {
  if (localStorage.token)
    dispatch({
      type: LOAD_TOKEN,
      payload: { token: localStorage.getItem("token") },
    });
};

//Signup User
export const signup = (formState, setFormState) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: SIGNUP_REQUEST });

    const { mobile, password, oneTimePassword } = formState;

    const res = await axios.post(
      "/auth/signup",
      { mobile, password, oneTimePassword },
      config
    );

    console.log(res);
    localStorage.setItem("token", res.data.token);
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    console.log(errors);
    if (errors) {
      let nextFormState = { ...formState };
      errors.forEach((error) => {
        //We show only one mobile or password or OTP error at a time
        if (error.param === "mobile" && !nextFormState.mobileError)
          nextFormState.mobileError = error.msg;
        else if (error.param === "password" && !nextFormState.passwordError)
          nextFormState.passwordError = error.msg;
        else if (error.param === "oneTimePassword" && !nextFormState.otpError)
          nextFormState.otpError = error.msg;
      });
      setFormState(nextFormState);
    }

    dispatch({ type: SIGNUP_FAIL });
  }
};

//Login User
export const login = (formState, setFormState) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({ type: LOGIN_REQUEST });

    const { mobile, password } = formState;

    const res = await axios.post("/auth/login", { mobile, password }, config);

    localStorage.setItem("token", res.data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    console.log(errors);
    if (errors) {
      let nextFormState = { ...formState };
      errors.forEach((error) => {
        //Show only one mobile or password or OTP error at a time
        if (error.param === "mobile" && !nextFormState.mobileError)
          nextFormState.mobileError = error.msg;
        else if (error.param === "password" && !nextFormState.passwordError)
          nextFormState.passwordError = error.msg;
      });
      setFormState(nextFormState);
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

///Logout User
export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
