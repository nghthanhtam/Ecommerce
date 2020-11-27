import {
  ADD_CART,
  DELETE_CART,
  UPDATE_CART,
  GET_CARTS_BY_IDUSER,
} from './types';

export const getCartsByIdUser = (params) => ({
  type: GET_CARTS_BY_IDUSER,
  pages: params,
});

export const deleteCart = (params) => ({
  type: DELETE_CART,
  params
});

export const addCart = (newCart) => ({
  type: ADD_CART,
  newCart: newCart,
});

export const updateCart = (newCart) => ({
  type: UPDATE_CART,
  newCart: newCart,
});
