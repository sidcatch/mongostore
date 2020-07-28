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
      return [...state, { ...payload, quantiy: 1 }]; //payload is product
    case REMOVEFROMCART:
      return state.filter((item) => item._id !== payload); //payload is product id
    case INCREMENTITEM:
      return state.map((item) => {
        if (item._id === payload) return { ...item, quantiy: item.quantiy + 1 };
        else return item;
      }); //payload is product id
    case DECREMENTITEM:
      return state.map((item) => {
        if (item._id === payload && !(item.quantiy - 1 < 0))
          return { ...item, quantiy: item.quantiy - 1 };
        else return item;
      }); //payload is product id
    case EMPTYCART:
      return [];
    default:
      return state;
  }
}
