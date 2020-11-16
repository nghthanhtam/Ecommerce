import {
  GET_VARIANTVALS,
  ADD_VARIANTVAL,
  DELETE_VARIANTVAL,
  UPDATE_VARIANTVAL,
} from './types';

export const getVariantVals = (params) => ({
  type: GET_VARIANTVALS,
  pages: params,
});

export const deleteVariantVal = (id) => ({
  type: DELETE_VARIANTVAL,
  id: id,
});

export const addVariantVal = (newVariantVal) => ({
  type: ADD_VARIANTVAL,
  newVariantVal: newVariantVal,
});

export const updateVariantVal = (newVariantVal) => ({
  type: UPDATE_VARIANTVAL,
  newVariantVal: newVariantVal,
});
