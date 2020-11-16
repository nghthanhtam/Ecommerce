import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_PRODUCTVARS,
  ADD_PRODUCTVAR,
  PRODUCTVARS_RECEIVED,
  PRODUCTVAR_ADDED,
  DELETE_PRODUCTVAR,
  PRODUCTVAR_DELETED,
  UPDATE_PRODUCTVAR,
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
          `${process.env.REACT_APP_BACKEND_HOST}/api/productvar?limit=${limit}&page=${page}&query=${query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: PRODUCTVARS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addProductVar(params) {
  const state = yield select();
  try {
    const response = yield call(
      () =>
        axios.post(
          `${process.env.REACT_APP_BACKEND_HOST}/api/productvar/`,
          params.newProductVar,
          tokenConfig(state)
        )
      // .then((res) => {
      //   console.log(res);
      // })
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: PRODUCTVAR_ADDED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateProductVar(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_HOST}/api/productvar/${params.newProductVar._id}`,
        params.newCategory,
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
        `${process.env.REACT_APP_BACKEND_HOST}/api/productvar/${params.id}`,
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
  yield takeEvery(ADD_PRODUCTVAR, addProductVar);
  yield takeEvery(UPDATE_PRODUCTVAR, updateProductVar);
  yield takeEvery(DELETE_PRODUCTVAR, deleteProductVars);
}
