import {
  GET_PRODUCT_CATES,
  ADD_PRODUCT_CATE,
  DELETE_PRODUCT_CATE,
  UPDATE_PRODUCT_CATE,
} from './types';

export const getProductCates = (params) => ({
  type: GET_PRODUCT_CATES,
  pages: params,
});

export const deleteProductCate = (id) => ({
  type: DELETE_PRODUCT_CATE,
  id: id,
});

export const addProductCate = (newProductCate) => ({
  type: ADD_PRODUCT_CATE,
  newProductCate: newProductCate,
});

export const updateProductCate = (newProductCate) => ({
  type: UPDATE_PRODUCT_CATE,
  newProductCate: newProductCate,
});
