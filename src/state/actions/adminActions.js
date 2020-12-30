import {
  GET_ADMINS,
  ADD_ADMIN,
  DELETE_ADMIN,
  UPDATE_ADMIN,
  GET_ADMIN_BY_ID,
} from "./types";

export const getAdmins = (params) => ({
  type: GET_ADMINS,
  pages: params,
});

export const getAdminById = (id) => ({
  type: GET_ADMIN_BY_ID,
  id,
});

export const deleteAdmin = (id) => ({
  type: DELETE_ADMIN,
  id: id,
});

export const addAdmin = (newEmp) => ({
  type: ADD_ADMIN,
  newEmp: newEmp,
});

export const updateAdmin = (newEmp) => ({
  type: UPDATE_ADMIN,
  newEmp: newEmp,
});
