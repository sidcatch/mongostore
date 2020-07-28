import {
  ADDTOCART,
  REMOVEFROMCART,
  INCREMENTITEM,
  DECREMENTITEM,
  EMPTYCART,
} from "./types";

export const addToCart = (product) => (dispatch, getState) => {
  let items = getState().cart;
  if (items.findIndex((item) => item.id === product.id) === -1)
    dispatch({
      type: ADDTOCART,
      payload: product,
    });
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: REMOVEFROMCART,
    payload: id,
  });
};

export const incrementItem = (id) => (dispatch) => {
  dispatch({
    type: INCREMENTITEM,
    payload: id,
  });
};

export const decrementItem = (id) => (dispatch, getState) => {
  let items = getState().cart;
  let item = items.find((item) => item.id === id);

  if (item.quantity > 1)
    dispatch({
      type: DECREMENTITEM,
      payload: id,
    });
  else
    dispatch({
      type: REMOVEFROMCART,
      payload: id,
    });
};

export const emptyCart = () => (dispatch) => {
  dispatch({
    type: EMPTYCART,
  });
};
