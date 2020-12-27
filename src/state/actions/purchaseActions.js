import {
  GET_PURCHASES,
  ADD_PURCHASE,
  DELETE_PURCHASE,
  UPDATE_PURCHASE,
  GET_PURCHASE_BY_ID,
} from "./types";

export const getPurchases = (params) => ({
  type: GET_PURCHASES,
  pages: params,
});

export const getPurchaseById = (id) => ({
  type: GET_PURCHASE_BY_ID,
  id,
});

export const deletePurchase = (id) => ({
  type: DELETE_PURCHASE,
  id: id,
});

export const addPurchase = (newPurchase) => ({
  type: ADD_PURCHASE,
  newPurchase: newPurchase,
});

export const updatePurchase = (newPurchase) => ({
  type: UPDATE_PURCHASE,
  newPurchase: newPurchase,
});
