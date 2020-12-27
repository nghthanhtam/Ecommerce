import {
  GET_PERMISSIONS,
  ADD_PERMISSION,
  DELETE_PERMISSION,
  UPDATE_PERMISSION,
} from "./types";

export const getPermissions = (params) => ({
  type: GET_PERMISSIONS,
  pages: params,
});

export const deletePermission = (id) => ({
  type: DELETE_PERMISSION,
  id: id,
});
export const addPermission = (newPermission) => ({
  type: ADD_PERMISSION,
  newPermission: newPermission,
});

export const updatePermission = (newPermission) => ({
  type: UPDATE_PERMISSION,
  newPermission: newPermission,
});
