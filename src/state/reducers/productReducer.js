import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_DELETED,
  PRODUCTS_RECEIVED,
  PRODUCT_ADDED,
  PRODUCT_UPDATED,
} from "../actions/types";

const initialState = {
  products: [],
  isLoaded: false,
  totalDocuments: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        // isLoaded: true,
      };
    case PRODUCTS_RECEIVED:
      return {
        ...state,
        products: action.payload.data.items,
        isLoaded: true,
        totalDocuments: action.payload.data.total,
      };
    case PRODUCT_ADDED:
      return {
        ...state,
        products: [action.payload, ...state.products],
        isLoaded: true,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
      };
    case PRODUCT_DELETED:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    case ADD_PRODUCT:
      return {
        ...state,
        isLoaded: false,
      };

    case PRODUCT_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
