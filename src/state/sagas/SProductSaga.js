import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  ADD_PRODUCT,
  PRODUCT_RECEIVED,
  PRODUCTS_RECEIVED,
  PRODUCT_ADDED,
  DELETE_PRODUCT,
  PRODUCT_DELETED,
  UPDATE_PRODUCT,
  PRODUCT_UPDATED,
  UPDATE_PRODUCTADD,
  PRODUCTADD_UPDATED,
  GET_PRODUCTS_BY_MOVIECAT
} from "../actions/types";

import mongoose from "mongoose";

function* fetchProductByid(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/${id}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );
    console.log(response);
    yield put({ type: PRODUCT_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
  }
}

function* fetchProducts(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product?limit=${limit}&page=${page}&query=${query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: PRODUCTS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* fetchProductsByMovieCate(params) {
  try {
    const state = yield select(),
      { limit, page, idCategory } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/moviecat/${idCategory}?limit=${limit}&page=${page}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: PRODUCTS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addProduct(params) {
  const state = yield select();
  try {
    const response = yield call(
      () =>
        axios.post(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/`,
          params.newProduct,
          tokenConfig(state)
        )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: PRODUCT_ADDED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateProduct(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/${params.newProduct._id}`,
        params.newProduct,
        tokenConfig(state)
      )
    );

    yield put({ type: PRODUCT_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deleteProducts(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: PRODUCT_DELETED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateProductAdd(params) {
  try {
    const { arrVariants } = params.params
    console.log('sagaArrVariants: ', arrVariants);
    yield put({ type: PRODUCTADD_UPDATED, payload: arrVariants });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sProductSaga() {
  yield takeEvery(GET_PRODUCT_BY_ID, fetchProductByid);
  yield takeEvery(GET_PRODUCTS, fetchProducts);
  yield takeEvery(GET_PRODUCTS_BY_MOVIECAT, fetchProductsByMovieCate);
  yield takeEvery(ADD_PRODUCT, addProduct);
  yield takeEvery(UPDATE_PRODUCT, updateProduct);
  yield takeEvery(DELETE_PRODUCT, deleteProducts);
  yield takeEvery(UPDATE_PRODUCTADD, updateProductAdd);
}
