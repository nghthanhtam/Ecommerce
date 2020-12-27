import {
  GET_ROLES,
  ADD_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE,
  GET_ROLE_BY_ID,
} from "./types";

export const getRoles = (params) => ({
  type: GET_ROLES,
  pages: params,
});

export const getRoleById = (id) => ({
  type: GET_ROLE_BY_ID,
  id,
});

export const deleteRole = (id) => ({
  type: DELETE_ROLE,
  id: id,
});
export const addRole = (newRole) => ({
  type: ADD_ROLE,
  newRole: newRole,
});

export const updateRole = (newRole) => ({
  type: UPDATE_ROLE,
  newRole: newRole,
});
