import {
  GET_PRODUCTVARVARS,
  ADD_PRODUCTVAR,
  DELETE_PRODUCTVAR,
  UPDATE_PRODUCTVAR,
} from './types';

export const getProductVars = (params) => ({
  type: GET_PRODUCTVARS,
  pages: params,
});

export const deleteProductVar = (id) => ({
  type: DELETE_PRODUCTVARVAR,
  id: id,
});

export const addProductVar = (newProductVar) => ({
  type: ADD_PRODUCTVARVAR,
  newProductVar: newProductVar,
});

export const updateProductVar = (newProductVar) => ({
  type: UPDATE_PRODUCTVARVAR,
  newProductVar: newProductVar,
});
