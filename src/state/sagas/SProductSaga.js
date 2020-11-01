import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  PRODUCTS_RECEIVED,
  PRODUCT_ADDED,
  DELETE_PRODUCT,
  PRODUCT_DELETED,
  UPDATE_PRODUCT,
  PRODUCT_UPDATED,
} from "../actions/types";

import mongoose from "mongoose";

function* fetchProducts(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_HOST}/api/productvar?limit=${limit}&page=${page}&query=${query}`,
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
  console.log(params);
  try {
    const response = yield call(
      () =>
        axios.post(
          `${process.env.REACT_APP_BACKEND_HOST}/api/productvar/`,
          params.newProduct,
          tokenConfig(state)
        )
      // .then((res) => {
      //   console.log(res);
      // })
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
        `${process.env.REACT_APP_BACKEND_HOST}/api/productvar/${params.newProduct._id}`,
        params.newCategory,
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
        `${process.env.REACT_APP_BACKEND_HOST}/api/productvar/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: PRODUCT_DELETED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sProductSaga() {
  yield takeEvery(GET_PRODUCTS, fetchProducts);
  yield takeEvery(ADD_PRODUCT, addProduct);
  yield takeEvery(UPDATE_PRODUCT, updateProduct);
  yield takeEvery(DELETE_PRODUCT, deleteProducts);
}
