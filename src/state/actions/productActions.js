import {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_IDSHOP,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT_STATUS,
  SORT_PRODUCTS,
  GET_PRODUCTS_BY_FILTERS,
  GET_RECOMMENDED_PRODUCTS,
  GET_TRENDING_PRODUCTS,
} from "./types";

export const sortProducts = (sortField) => ({
  type: SORT_PRODUCTS,
  sortField,
});

export const getRecProducts = (params) => ({
  type: GET_RECOMMENDED_PRODUCTS,
  pages: params,
});

export const getProductsByIdShop = (params) => ({
  type: GET_PRODUCTS_BY_IDSHOP,
  pages: params,
});

export const getProducts = (params) => ({
  type: GET_PRODUCTS,
  pages: params,
});

export const getProductById = (params) => ({
  type: GET_PRODUCT_BY_ID,
  params,
});

export const getProductsByFilters = (params) => ({
  type: GET_PRODUCTS_BY_FILTERS,
  pages: params,
});

export const getTrendingProducts = (params) => ({
  type: GET_TRENDING_PRODUCTS,
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

export const updateProductStatus = ({ status, id, pages }) => ({
  type: UPDATE_PRODUCT_STATUS,
  params: { status, id, pages },
});
