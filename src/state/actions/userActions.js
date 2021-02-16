import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  GET_USER_BY_ID,
  UPDATE_USER,
  CLEAR_USER,
  UPDATE_PASS,
  ADD_SURVEY,
} from "./types";

export const addSurvey = (newItem) => ({
  type: ADD_SURVEY,
  newItem,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const getUsers = (params) => ({
  type: GET_USERS,
  pages: params,
});

export const getUserById = (params) => ({
  type: GET_USER_BY_ID,
  params,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  id,
});

export const addUser = (newUser) => ({
  type: ADD_USER,
  newUser,
});

export const updateUser = (newUser) => ({
  type: UPDATE_USER,
  newUser,
});

export const updatePass = (params) => ({
  type: UPDATE_PASS,
  params,
});
