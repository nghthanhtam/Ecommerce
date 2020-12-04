import {
  GET_ORDERS,
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  GET_USER_ORDERS,
  GET_ORDERDETS_BY_ORDERID
} from './types';

export const getOrders = (params) => ({
  type: GET_ORDERS,
  pages: params,
});

export const getUserOrders = (id) => ({
  type: GET_USER_ORDERS,
  id,
});

export const getOrderDets = (id) => ({
  type: GET_ORDERDETS_BY_ORDERID,
  id,
});

export const deleteOrder = (id) => ({
  type: DELETE_ORDER,
  id: id,
});

export const addOrder = (arrOrders) => ({
  type: ADD_ORDER,
  arrOrders: arrOrders,
});

export const updateOrder = (newOrder) => ({
  type: UPDATE_ORDER,
  newOrder: newOrder,
});
