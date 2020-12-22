import {
  GET_PAYSLIPS,
  ADD_PAYSLIP,
  DELETE_PAYSLIP,
  UPDATE_PAYSLIP,
} from "./types";

export const getPayslips = (params) => ({
  type: GET_PAYSLIPS,
  pages: params,
});

export const deletePayslip = (id) => ({
  type: DELETE_PAYSLIP,
  id,
});

export const addPayslip = (newPayslip) => ({
  type: ADD_PAYSLIP,
  newPayslip,
});

export const updatePayslip = (newPayslip) => ({
  type: UPDATE_PAYSLIP,
  newPayslip,
});
