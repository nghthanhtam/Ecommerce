import {
  GET_SHOPS,
  ADD_SHOP,
  DELETE_SHOP,
  UPDATE_SHOP,
  GET_SHOP_BY_ID,
  UPDATE_SHOP_STATUS,
  CLEAR_SHOP,
} from "./types";

export const clearShop = () => ({
  type: CLEAR_SHOP,
});

export const getShops = (params) => ({
  type: GET_SHOPS,
  pages: params,
});

export const getShopById = (id) => ({
  type: GET_SHOP_BY_ID,
  id,
});

export const deleteShop = (id) => ({
  type: DELETE_SHOP,
  id: id,
});

export const addShop = (newShop) => ({
  type: ADD_SHOP,
  newShop,
});

export const updateShop = (params) => ({
  type: UPDATE_SHOP,
  params,
});

export const updateShopStatus = ({ status, id, pages }) => ({
  type: UPDATE_SHOP_STATUS,
  params: { status, id, pages },
});
