import {
  GET_PRODUCTVARS,
  ADD_PRODUCTVAR,
  DELETE_PRODUCTVAR,
  PRODUCTVAR_DELETED,
  PRODUCTVARS_RECEIVED,
  PRODUCTVAR_ADDED,
  PRODUCTVAR_UPDATED,
  PRODUCTVAR_RECEIVED,
  GET_PRODUCTVAR_BY_ID
} from "../actions/types";

const initialState = {
  productVars: [],
  productVar: {},
  isLoaded: false,
  totalDocuments: 0,
  isAdded: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTVARS:
      return {
        ...state,
        isLoaded: false
      };
    case PRODUCTVARS_RECEIVED:
      return {
        ...state,
        productVars: action.payload.data.items,
        isLoaded: true,
        totalDocuments: action.payload.data.total,
      };
    case GET_PRODUCTVAR_BY_ID:
      return {
        ...state,
        isLoaded: false
      };
    case PRODUCTVAR_RECEIVED:
      return {
        ...state,
        productVar: action.payload.data,
        isLoaded: true,
      };
    case PRODUCTVAR_ADDED:
      return {
        ...state,
        productVars: [action.payload, ...state.productVars],
        //isLoaded: true,
        isAdded: true
      };
    case DELETE_PRODUCTVAR:
      return {
        ...state,
      };
    case PRODUCTVAR_DELETED:
      return {
        ...state,
        productVars: state.productVars.filter(
          (productVar) => productVar.id !== action.payload.id
        ),
      };
    case ADD_PRODUCTVAR:
      return {
        ...state,
        isLoaded: false,
      };

    case PRODUCTVAR_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
