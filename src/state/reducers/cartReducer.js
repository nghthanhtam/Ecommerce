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
  total: 0,
  totalCount: 0,
  promotions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARTS_BY_IDUSER:
      return {
        ...state,
        isLoaded: false,
      };
    case CARTS_RECEIVED:
      return {
        ...state,
        carts: action.payload.items,
        total: action.payload.total,
        totalCount: action.payload.totalCount,
        promotions: action.payload.promotions,
        isLoaded: true,
      };
    case CART_ADDED:
      return {
        ...state,
        //carts: [action.payload, ...state.carts],
        isLoaded: true,
      };

    case CART_DELETED:
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.id !== action.payload.id),
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
