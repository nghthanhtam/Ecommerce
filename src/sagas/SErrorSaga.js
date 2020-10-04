import { takeEvery, put } from "redux-saga/effects";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ERRORS_RETURNED,
  ERRORS_CLEARED,
} from "../actions/types";

function* getErrors(params) {
  console.log(params);
  try {
    yield put({ type: ERRORS_RETURNED, payload: params });
  } catch (error) {
    yield put({ error });
  }
}

function* clearErrors(params) {
  try {
    yield put({ type: ERRORS_CLEARED });
  } catch (error) {
    yield put({ error });
  }
}

export default function* sErrorSaga() {
  yield takeEvery(GET_ERRORS, getErrors);
  yield takeEvery(CLEAR_ERRORS, clearErrors);
}
