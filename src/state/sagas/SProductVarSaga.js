import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_PRODUCTVARS,
  GET_PRODUCTVARS_BY_IDSHOP,
  ADD_PRODUCTVAR,
  PRODUCTVARS_RECEIVED,
  PRODUCTVAR_ADDED,
  DELETE_PRODUCTVAR,
  PRODUCTVAR_DELETED,
  UPDATE_PRODUCTVAR,
  UPDATE_PRODUCTVAR_STATUS,
  PRODUCTVAR_UPDATED,
} from "../actions/types";

import mongoose from "mongoose";

function* fetchProductVars(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productvar?limit=${limit}&page=${page}&query=${query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: PRODUCTVARS_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
  }
}

function* fetchProductVarsByIdShop(params) {
  try {
    const state = yield select();
    let { limit, page, query, idShop, getActive } = params.pages;



    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productvar/shop/${idShop}?limit=${limit}&page=${page}&query=${query}&getActive=${getActive}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );
    console.log(response.data);
    yield put({ type: PRODUCTVARS_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
  }
}

function* addProductVar(params) {
  const state = yield select();
  try {
    const response = yield call(
      () =>
        axios.post(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productvar/`,
          params.newProductVar,
          tokenConfig(state)
        )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: PRODUCTVAR_ADDED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateProductVarStatus(params) {
  console.log(params.newProductVar);
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productvar/${params.newProductVar.id}/status`,
        params.newProductVar,
        tokenConfig(state)
      )
    );

    yield put({ type: PRODUCTVAR_UPDATED, payload: response.data });
    yield put({
      type: GET_PRODUCTVARS_BY_IDSHOP, pages: { limit: 10, page: 1, query: '', idShop: 1, getActive: false },
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateProductVar(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productvar/${params.newProductVar.id}`,
        params.newProductVar,
        tokenConfig(state)
      )
    );
    yield put({ type: PRODUCTVAR_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* deleteProductVars(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productvar/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: PRODUCTVAR_DELETED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sProductVarSaga() {
  yield takeEvery(GET_PRODUCTVARS, fetchProductVars);
  yield takeEvery(GET_PRODUCTVARS_BY_IDSHOP, fetchProductVarsByIdShop);
  yield takeEvery(ADD_PRODUCTVAR, addProductVar);
  yield takeEvery(UPDATE_PRODUCTVAR_STATUS, updateProductVarStatus);
  yield takeEvery(UPDATE_PRODUCTVAR, updateProductVar);
  yield takeEvery(DELETE_PRODUCTVAR, deleteProductVars);

}
