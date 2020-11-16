import { takeEvery, put, call, all, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_VARIANTVALS,
  ADD_VARIANTVAL,
  VARIANTVALS_RECEIVED,
  VARIANTVAL_ADDED,
  DELETE_VARIANTVAL,
  VARIANTVAL_DELETED,
  UPDATE_VARIANTVAL,
  VARIANTVAL_UPDATED
} from "../actions/types";

import mongoose from "mongoose";

function* fetchVariantVals(params) {
  try {
    const state = yield select(),
      { limit, page, query, idVariant } = params.pages;

    let variants = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/variant?limit=${limit}&page=${page}`,
          tokenConfig(state)
        )
    );

    let values = []
    for (let variant of variants.data.items) {
      values = yield call(() =>
        axios
          .get(`${process.env.REACT_APP_BACKEND_PRODUCT}/api/variantvalue/variant/${variant.id}?limit=${limit}&page=${page}`,
            tokenConfig(state))
      );
      variant.values = values.data.items
    }


    // const [variant, values] = yield all([
    //   call(() =>
    //     axios
    //       .get(`${process.env.REACT_APP_BACKEND_PRODUCT}/api/variant?limit=${limit}&page=${page}&query=${query}`,
    //         tokenConfig(state))
    //   ),
    //   call(() => axios
    //     .get(`${process.env.REACT_APP_BACKEND_PRODUCT}/api/variantvalue/variant/${idVariant}?limit=${limit}&page=${page}`,
    //       tokenConfig(state)))
    // ])
    console.log('variants: ', variants);
    //variant.values = values
    yield put({ type: VARIANTVALS_RECEIVED, payload: variants });
  } catch (error) {
    console.log(error);
  }
}

function* addVariantVal(params) {
  const state = yield select();
  try {
    const response = yield call(
      () =>
        axios.post(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/variantvalue/`,
          params.newVariantVal,
          tokenConfig(state)
        )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: VARIANTVAL_ADDED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateVariantVal(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/variantvalue/${params.newVariantVal._id}`,
        params.newCategory,
        tokenConfig(state)
      )
    );

    yield put({ type: VARIANTVAL_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deleteVariantVals(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/variantvalue/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: VARIANTVAL_DELETED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sVariantValSaga() {
  yield takeEvery(GET_VARIANTVALS, fetchVariantVals);
  yield takeEvery(ADD_VARIANTVAL, addVariantVal);
  yield takeEvery(UPDATE_VARIANTVAL, updateVariantVal);
  yield takeEvery(DELETE_VARIANTVAL, deleteVariantVals);
}
