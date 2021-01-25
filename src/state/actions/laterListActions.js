import {
  GET_LATERLISTS,
  ADD_LATERLIST,
  DELETE_LATERLIST,
  UPDATE_LATERLIST,
} from "./types";

export const getLaterlists = (params) => ({
  type: GET_LATERLISTS,
  pages: params,
});

export const deleteLaterlist = (id) => ({
  type: DELETE_LATERLIST,
  id: id,
});

export const addLaterlist = (newItem) => ({
  type: ADD_LATERLIST,
  newItem,
});

export const updateLaterlist = (newItem) => ({
  type: UPDATE_LATERLIST,
  newItem,
});
