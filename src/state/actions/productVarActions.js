import {
  GET_PRODUCTVARS,
  GET_PRODUCTVARS_BY_IDSHOP,
  DELETE_PRODUCTVAR,
  UPDATE_PRODUCTVAR,
  UPDATE_PRODUCTVAR_STATUS,
  GET_PRODUCTVAR_BY_ID,
} from './types';

export const getProductVars = (params) => ({
  type: GET_PRODUCTVARS,
  pages: params,
});

export const getProductVarById = (params) => ({
  type: GET_PRODUCTVAR_BY_ID,
  params: params,
});

export const getProductVarsByIdShop = (params) => ({
  type: GET_PRODUCTVARS_BY_IDSHOP,
  pages: params,
});

export const deleteProductVar = (id) => ({
  type: DELETE_PRODUCTVAR,
  id: id,
});

export const updateProductVar = (newProductVar) => ({
  type: UPDATE_PRODUCTVAR,
  newProductVar: newProductVar,
});

export const updateProductVarStatus = (newProductVar) => ({
  type: UPDATE_PRODUCTVAR_STATUS,
  newProductVar: newProductVar,
});