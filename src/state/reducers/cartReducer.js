import {
  GET_CARTS_BY_IDUSER,
  ADD_CART,
  CART_DELETED,
  CARTS_RECEIVED,
  CART_ADDED,
  CART_UPDATED,
} from "../actions/types";

const initialState = {
  carts: [],
  isLoaded: false,
  totalDocuments: 0,
  total: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARTS_BY_IDUSER:
      return {
        ...state,
      };
    case CARTS_RECEIVED:
      return {
        ...state,
        carts: action.payload.items,
        total: action.payload.total,
        isLoaded: true,
      };
    case CART_ADDED:
      return {
        ...state,
        carts: [action.payload, ...state.carts],
        isLoaded: true,
      };

    case CART_DELETED:
      return {
        ...state,
        carts: state.carts.filter(
          (cart) => cart.id !== action.payload.id
        ),
      };
    case ADD_CART:
      return {
        ...state,
        isLoaded: false,
      };
    case CART_UPDATED:
      return {
        ...state,
      };
    default:
      return state;
  }
}
