import {
  GET_ORDERS_BY_SHOP,
  ADD_ORDER,
  GET_ORDERS,
  DELETE_ORDER,
  UPDATE_ORDER,
  GET_USER_ORDERS,
  GET_ORDERDETS_BY_ORDERID,
  UPDATE_SHIPPINGFEE,
  DELETE_PROMOTIONINFOR,
  RESET_ORDER,
  GET_ORDERS_BY_PURCHASE,
} from "./types";

export const resetOrderAdded = () => ({
  type: RESET_ORDER,
});

export const addOrder = (newOrder) => ({
  type: ADD_ORDER,
  newOrder,
});

export const getOrders = (params) => ({
  type: GET_ORDERS,
  pages: params,
});

export const getOrdersByPurchase = (params) => ({
  type: GET_ORDERS_BY_PURCHASE,
  pages: params,
});

export const getOrdersByShop = (params) => ({
  type: GET_ORDERS_BY_SHOP,
  pages: params,
});

export const getUserOrders = (params) => ({
  type: GET_USER_ORDERS,
  pages: params,
});

export const getOrderDets = (id) => ({
  type: GET_ORDERDETS_BY_ORDERID,
  id,
});

export const deleteOrder = (id) => ({
  type: DELETE_ORDER,
  id: id,
});

export const deletePromotionInfor = (id) => ({
  type: DELETE_PROMOTIONINFOR,
  id,
});

export const updateShippingFee = (newOrder) => ({
  type: UPDATE_SHIPPINGFEE,
  newOrder,
});

export const updateOrder = (newOrder) => ({
  type: UPDATE_ORDER,
  newOrder,
});
