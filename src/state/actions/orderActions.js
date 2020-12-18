import {
  GET_ORDERS_BY_SHOP,
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  GET_USER_ORDERS,
  GET_ORDERDETS_BY_ORDERID
} from './types';

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

export const addOrder = (newOrder) => ({
  type: ADD_ORDER,
  newOrder,
});

export const updateOrder = (newOrder) => ({
  type: UPDATE_ORDER,
  newOrder: newOrder,
});
