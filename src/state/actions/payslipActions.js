import {
  GET_PAYSLIPS,
  ADD_PAYSLIP,
  DELETE_PAYSLIP,
  UPDATE_PAYSLIP,
  GET_PAYSLIP_BY_ID,
} from "./types";

export const getPayslips = (params) => ({
  type: GET_PAYSLIPS,
  pages: params,
});

export const getPayslipById = (id) => ({
  type: GET_PAYSLIP_BY_ID,
  id,
});

export const deletePayslip = (id) => ({
  type: DELETE_PAYSLIP,
  id,
});

export const addPayslip = (newItem) => ({
  type: ADD_PAYSLIP,
  newItem,
});

export const updatePayslip = (newItem) => ({
  type: UPDATE_PAYSLIP,
  newItem,
});
