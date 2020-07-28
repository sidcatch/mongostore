import {
  ADDTOCART,
  REMOVEFROMCART,
  INCREMENTITEM,
  DECREMENTITEM,
} from "./types";

export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
