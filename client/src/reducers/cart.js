import {
  ADDTOCART,
  REMOVEFROMCART,
  INCREMENTITEM,
  DECREMENTITEM,
  EMPTYCART,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADDTOCART:
      return [...state, { ...payload, quantity: 1 }]; //payload is product
    case REMOVEFROMCART:
      return state.filter((item) => item.id !== payload); //payload is product id
    case INCREMENTITEM:
      return state.map((item) => {
        if (item.id === payload)
          return { ...item, quantity: item.quantity + 1 };
        return item;
      }); //payload is product id
    case DECREMENTITEM:
      return state.map((item) => {
        if (item.id === payload)
          return { ...item, quantity: item.quantity - 1 };
        return item;
      }); //payload is product id
    case EMPTYCART:
      return [];
    default:
      return state;
  }
}
