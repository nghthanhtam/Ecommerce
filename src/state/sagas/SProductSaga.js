import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { tokenAdminConfig } from "../actions/authAdminActions";
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
  UPDATE_PRODUCT_STATUS,
  PRODUCT_UPDATED,
  UPDATE_PRODUCTADD,
  PRODUCTADD_UPDATED,
  GET_PRODUCTS_BY_MOVIECAT
} from "../actions/types";

import mongoose from "mongoose";

function* fetchProductByid(params) {
  try {
    const state = yield select(),
      { idProduct, idShop } = params.params;
    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/${idProduct}/shop/${idShop}`,
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
      { limit, page, query, arrayStatus } = params.pages;
    let tempString = '';
    for (let x = 0; x < arrayStatus.length; x++) {
      tempString += `&arrayStatus[]=${arrayStatus[x]}`;
    }
    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product?limit=${limit}&page=${page}&query=${query}` + tempString,
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

function* updateProductStt(params) {
  const state = yield select(),
    { id, status, pages } = params.params

  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/${id}/status`,
        { status },
        tokenAdminConfig(state)
      )
    );
    yield put({ type: PRODUCT_UPDATED, payload: response.data });
    yield put({
      type: GET_PRODUCTS,
      pages,
    });
  } catch (error) {
    console.log({ ...error });
  }
}

export default function* sProductSaga() {
  yield takeEvery(GET_PRODUCT_BY_ID, fetchProductByid);
  yield takeEvery(GET_PRODUCTS, fetchProducts);
  yield takeEvery(GET_PRODUCTS_BY_MOVIECAT, fetchProductsByMovieCate);
  yield takeEvery(ADD_PRODUCT, addProduct);
  yield takeEvery(UPDATE_PRODUCT, updateProduct);
  yield takeEvery(UPDATE_PRODUCT_STATUS, updateProductStt);
  yield takeEvery(DELETE_PRODUCT, deleteProducts);
  yield takeEvery(UPDATE_PRODUCTADD, updateProductAdd);
}
