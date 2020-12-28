import {
  GET_ROLEADMINS,
  ADD_ROLEADMIN,
  DELETE_ROLEADMIN,
  UPDATE_ROLEADMIN,
  GET_ROLEADMIN_BY_ID,
} from "./types";

export const getRoleAdmins = (params) => ({
  type: GET_ROLEADMINS,
  pages: params,
});

export const getRoleAdminById = (id) => ({
  type: GET_ROLEADMIN_BY_ID,
  id,
});

export const deleteRoleAdmin = (id) => ({
  type: DELETE_ROLEADMIN,
  id: id,
});
export const addRoleAdmin = (newRoleAdmin) => ({
  type: ADD_ROLEADMIN,
  newRoleAdmin: newRoleAdmin,
});

export const updateRoleAdmin = (newRoleAdmin) => ({
  type: UPDATE_ROLEADMIN,
  newRoleAdmin: newRoleAdmin,
});
