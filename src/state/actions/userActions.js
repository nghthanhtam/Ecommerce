import { GET_USERS, ADD_USER, DELETE_USER, GET_USER_BY_ID } from "./types";

export const getUsers = (params) => ({
  type: GET_USERS,
  pages: params,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  id: id,
});

export const addUser = (newUser) => ({
  type: ADD_USER,
  newUser: newUser,
});

export const updateUser = (newUser) => ({
  type: UPDATE_USER,
  newUser: newUser,
});