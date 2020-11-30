import {
  GET_ORDERS,
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
} from './types';

export const getOrders = (params) => ({
  type: GET_ORDERS,
  pages: params,
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
