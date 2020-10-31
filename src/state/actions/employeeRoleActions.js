import {
  GET_EMPROLES,
  ADD_EMPROLE,
  DELETE_EMPROLE,
  UPDATE_EMPROLE,
} from './types';

export const getEmpRoles = (params) => ({
  type: GET_EMPROLES,
  pages: params,
});

export const deleteEmpRole = (id) => ({
  type: DELETE_EMPROLE,
  id: id,
});

export const addEmpRole = (newEmpRole) => ({
  type: ADD_EMPROLE,
  newEmpRole: newEmpRole,
});

export const updateEmpRole = (newEmpRole) => ({
  type: UPDATE_EMPROLE,
  newEmpRole: newEmpRole,
});
