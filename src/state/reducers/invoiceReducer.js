import {
  GET_INVOICES,
  INVOICES_RECEIVED,
  ADD_INVOICE,
  INVOICES_ADDED,
  INVOICE_UPDATED,
  DELETE_INVOICE,
  INVOICE_DELETED,
  GET_ALL_INVOICES,
} from "../actions/types";

const initialState = {
  invoices: [],
  isLoaded: false,
  type: null,
  response: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVOICES:
      return {
        ...state,
        isLoaded: true,
        //invoices: action.payload,
        //type: action.type,
      };

    case GET_ALL_INVOICES:
      return {
        ...state,
        //invoices: action.payload,
        isLoaded: true,
      };

    case INVOICES_RECEIVED:
      return { ...state, invoices: action.payload.data, isLoaded: true };

    case ADD_INVOICE:
      return {
        ...state,
        // invoices: [action.payload, ...state.invoices],
        // type: action.type,
        response: action.response,
      };

    case INVOICES_ADDED:
      return {
        ...state,
        invoices: [action.payload, ...state.invoices],
        isLoaded: true,
      };

    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(
          (inv) => inv._id !== action.payload._id
        ),
      };

    case INVOICE_DELETED:
      return {
        ...state,
        invoices: state.invoices.filter(
          (inv) => inv._id !== action.payload._id
        ),
      };

    case INVOICE_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
