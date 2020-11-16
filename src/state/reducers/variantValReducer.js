import {
  GET_VARIANTVALS,
  ADD_VARIANTVAL,
  DELETE_VARIANTVAL,
  VARIANTVAL_DELETED,
  VARIANTVALS_RECEIVED,
  VARIANTVAL_ADDED,
  VARIANTVAL_UPDATED,
} from "../actions/types";

const initialState = {
  variantVals: [],
  isLoaded: false,
  totalDocuments: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VARIANTVALS:
      return {
        ...state,
        // isLoaded: true,
      };
    case VARIANTVALS_RECEIVED:
      return {
        ...state,
        variantVals: action.payload.data.items,
        isLoaded: true,
        totalDocuments: action.payload.data.total,
      };
    case VARIANTVAL_ADDED:
      return {
        ...state,
        variantVals: [action.payload, ...state.variantVals],
        isLoaded: true,
      };
    case DELETE_VARIANTVAL:
      return {
        ...state,
      };
    case VARIANTVAL_DELETED:
      return {
        ...state,
        variantVals: state.variantVals.filter(
          (variantVal) => variantVal._id !== action.payload._id
        ),
      };
    case ADD_VARIANTVAL:
      return {
        ...state,
        isLoaded: false,
      };

    case VARIANTVAL_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
