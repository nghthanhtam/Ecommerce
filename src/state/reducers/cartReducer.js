import {
  GET_CARTS,
  ADD_CART,
  DELETE_CART,
  CART_DELETED,
  CARTS_RECEIVED,
  CART_ADDED,
  CART_UPDATED,
} from "../actions/types";

const initialState = {
  carts: [],
  isLoaded: false,
  totalDocuments: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARTS:
      return {
        ...state,
        // isLoaded: true,
      };
    case CARTS_RECEIVED:
      return {
        ...state,
        carts: action.payload.data.items,
        isLoaded: true,
        totalDocuments: action.payload.data.total,
      };
    case CART_ADDED:
      return {
        ...state,
        carts: [action.payload, ...state.carts],
        isLoaded: true,
      };
    case DELETE_CART:
      return {
        ...state,
      };
    case CART_DELETED:
      return {
        ...state,
        carts: state.carts.filter(
          (cart) => cart._id !== action.payload._id
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
