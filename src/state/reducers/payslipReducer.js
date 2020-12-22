import {
  GET_PAYSLIPS,
  ADD_PAYSLIP,
  DELETE_PAYSLIP,
  PAYSLIP_DELETED,
  PAYSLIPS_RECEIVED,
  PAYSLIP_ADDED,
  PAYSLIP_UPDATED,
  UPDATE_PAYSLIP,
} from "../actions/types";

const initialState = {
  payslips: [],
  isLoaded: false,
  isUpdated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PAYSLIPS:
      return {
        ...state,
        isLoaded: true,
      };
    case PAYSLIPS_RECEIVED:
      return { ...state, payslips: action.payload.data, isLoaded: true };
    case PAYSLIP_ADDED:
      return {
        ...state,
        payslips: [action.payload, ...state.payslips],
        isLoaded: true,
      };
    case DELETE_PAYSLIP:
      return {
        ...state,
      };
    case PAYSLIP_DELETED:
      return {
        ...state,
        payslips: state.payslips.filter(
          (payslip) => payslip._id !== action.payload._id
        ),
      };
    case ADD_PAYSLIP:
      return {
        ...state,
        //payslips: [action.payload, ...state.payslips],
        isLoaded: false,
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

    default:
      return state;
  }
}
