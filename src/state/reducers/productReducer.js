import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_DELETED,
  PRODUCTS_RECEIVED,
  PRODUCT_RECEIVED,
  PRODUCT_ADDED,
  PRODUCT_UPDATED,
  SORT_PRODUCTS,
  GET_PRODUCTS_BY_IDSHOP,
  GET_PRODUCT_BY_ID,
  PRODUCTS_SORTED,
  GET_PRODUCTS_BY_FILTERS,
  REC_PRODUCTS_RECEIVED,
  GET_RECOMMENDED_PRODUCTS,
} from "../actions/types";

const initialState = {
  products: [],
  isLoaded: false,
  totalDocuments: 0,
  isProductLoaded: false,
  recProducts: [],
  isRec: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SORT_PRODUCTS:
      return {
        ...state,
        isLoaded: false,
      };
    case PRODUCTS_SORTED:
      switch (action.payload) {
        case "des":
          return {
            ...state,
            products: state.products.sort((a, b) =>
              parseFloat(
                parseFloat(b.ProductVars[0].price) - a.ProductVars[0].price
              )
            ),
            isLoaded: true,
            totalDocuments: state.totalDocuments,
          };
        case "asc":
          return {
            ...state,
            products: state.products.sort(
              (a, b) =>
                parseFloat(a.ProductVars[0].price) -
                parseFloat(b.ProductVars[0].price)
            ),
            isLoaded: true,
            totalDocuments: state.totalDocuments,
          };
        case "bestsold":
          return {
            ...state,
            products: action.payload.data.items,
            isLoaded: true,
            totalDocuments: action.payload.data.total,
          };
        case "latest":
          return {
            ...state,
            products: state.products.sort(
              (a, b) =>
                parseFloat(a.ProductVars[0].createdAt) -
                parseFloat(b.ProductVars[0].createdAt)
            ),
            isLoaded: true,
            totalDocuments: state.totalDocuments,
          };
        default:
          return {
            ...state,
            isLoaded: false,
          };
      }

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        isProductLoaded: false,
      };

    case GET_PRODUCTS_BY_FILTERS:
      return {
        ...state,
        isLoaded: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        isLoaded: false,
      };
    case GET_RECOMMENDED_PRODUCTS:
      return {
        ...state,
        isRec: false,
      };
    case REC_PRODUCTS_RECEIVED:
      return {
        ...state,
        recProducts: action.payload.data.items,
        isRec: true,
      };
    case GET_PRODUCTS_BY_IDSHOP:
      return {
        ...state,
        isLoaded: false,
      };
    case PRODUCTS_RECEIVED:
      return {
        ...state,
        products: action.payload.data.items,
        isLoaded: true,
        totalDocuments: action.payload.data.total,
      };
    case PRODUCT_RECEIVED:
      return {
        ...state,
        product: action.payload.data,
        isProductLoaded: true,
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
          (product) => product.id !== action.payload.id
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
