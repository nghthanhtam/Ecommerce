import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { tokenAdminConfig } from "../actions/authAdminActions";
import {
  GET_PURCHASES,
  ADD_PURCHASE,
  PURCHASES_RECEIVED,
  PURCHASE_RECEIVED,
  PURCHASE_ADDED,
  DELETE_PURCHASE,
  PURCHASE_DELETED,
  UPDATE_PURCHASE,
  PURCHASE_UPDATED,
  GET_PURCHASE_BY_ID,
} from "../actions/types";

function* fetchPurchases(params) {
  try {
    const state = yield select(),
      { limit, page, query, status } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/purchase?limit=${limit}&page=${page}&query=${query}&status=${status}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PURCHASES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/admin/login",
      });
    }
  }
}

function* fetchPurchaseById(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/purchase/${id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PURCHASE_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/admin/login",
      });
    }
  }
}

function* addPurchase(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/purchase/`,
        params.newPurchase,
        tokenConfig(state)
      )
    );

    yield put({ type: PURCHASE_ADDED, payload: response.data });
    yield put({
      type: GET_PURCHASES,
      pages: params.newPurchase.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updatePurchase(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/purchase/${params.newPurchase.id}`,
        params.newPurchase,
        tokenConfig(state)
      )
    );

    yield put({ type: PURCHASE_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* deletePurchase(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/purchase/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: PURCHASE_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sPurchaseSaga() {
  yield takeEvery(GET_PURCHASES, fetchPurchases);
  yield takeEvery(GET_PURCHASE_BY_ID, fetchPurchaseById);
  yield takeEvery(ADD_PURCHASE, addPurchase);
  yield takeEvery(UPDATE_PURCHASE, updatePurchase);
  yield takeEvery(DELETE_PURCHASE, deletePurchase);
}
