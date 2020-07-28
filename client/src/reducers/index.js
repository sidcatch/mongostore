import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import cart from "./cart";

export default combineReducers({
  auth,
  alert,
  cart,
});
