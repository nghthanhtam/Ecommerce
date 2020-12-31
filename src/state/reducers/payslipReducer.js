import {
  GET_PAYSLIPS,
  ADD_PAYSLIP,
  GET_PAYSLIP_BY_ID,
  PAYSLIP_DELETED,
  PAYSLIPS_RECEIVED,
  PAYSLIP_ADDED,
  PAYSLIP_UPDATED,
  UPDATE_PAYSLIP,
  PAYSLIP_RECEIVED,
  ADD_NOTIFICATION,
} from "../actions/types";

const initialState = {
  payslips: [],
  payslip: {},
  totalDocuments: 0,
  isLoaded: false,
  isUpdated: false,
  abc: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PAYSLIPS:
      return {
        ...state,
        isUpdated: false,
        isLoaded: false,
      };
    case GET_PAYSLIP_BY_ID:
      return {
        ...state,
        isUpdated: false,
        isLoaded: false,
      };
    case PAYSLIPS_RECEIVED:
      return {
        ...state,
        payslips: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case PAYSLIP_RECEIVED:
      return {
        ...state,
        payslip: action.payload.data,
        isLoaded: true,
      };
    case ADD_PAYSLIP:
      return {
        ...state,
        isLoaded: false,
      };
    case PAYSLIP_ADDED:
      return {
        ...state,
        isLoaded: true,
      };
    case PAYSLIP_DELETED:
      return {
        ...state,
        payslips: state.payslips.filter(
          (payslip) => payslip.id !== action.payload.id
        ),
      };
    case UPDATE_PAYSLIP:
      return {
        ...state,
        isUpdated: false,
      };
    case PAYSLIP_UPDATED:
      return {
        ...state,
        isUpdated: true,
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        abc: false,
      };
    default:
      return state;
  }
}
