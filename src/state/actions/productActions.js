import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from './types';

export const getProducts = (params) => ({
  type: GET_PRODUCTS,
  pages: params,
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  id: id,
});

export const addProduct = (newProduct) => ({
  type: ADD_PRODUCT,
  newProduct: newProduct,
});

export const updateProduct = (newProduct) => ({
  type: UPDATE_PRODUCT,
  newProduct: newProduct,
});
