import {
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_TOKEN,
  LOGOUT
} from "../actions/types";

const initialState = {
  token: null,
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case LOAD_TOKEN:
      return {
        ...state,
        token: payload.token,
        loading: false
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        token: null,
        loading: false
      };

    default:
      return state;
  }
}
