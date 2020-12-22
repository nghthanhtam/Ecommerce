import {
  ADD_STOCK_HISTORY,
  DELETE_STOCK_HISTORY,
  UPDATE_STOCK_HISTORY,
  GET_STOCK_HISTORIES_BY_PRODUCTVAR,
  GET_STOCK_HISTORY_BY_ID,
} from "./types";

export const getStockHisById = (id) => ({
  type: GET_STOCK_HISTORY_BY_ID,
  id,
});

export const getStockHisByProductVar = (params) => ({
  type: GET_STOCK_HISTORIES_BY_PRODUCTVAR,
  pages: params,
});

export const deleteStockHis = (id) => ({
  type: DELETE_STOCK_HISTORY,
  id: id,
});

export const addStockHis = (newItem) => ({
  type: ADD_STOCK_HISTORY,
  newItem,
});

export const updateStockHis = (newItem) => ({
  type: UPDATE_STOCK_HISTORY,
  newItem,
});
