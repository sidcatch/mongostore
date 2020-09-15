import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [
  /* {
    msg: "Your Order has been placed!",
    alertType: "success",
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  },
  {
    msg: "Your password has been changed",
    alertType: "success",
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  }, */
];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
