import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { tokenAdminConfig } from "../actions/authAdminActions";
import {
  GET_STOCK_HISTORY_BY_ID,
  ADD_STOCK_HISTORY,
  STOCK_HISTORIES_RECEIVED,
  STOCK_HISTORY_RECEIVED,
  STOCK_HISTORY_ADDED,
  DELETE_STOCK_HISTORY,
  STOCK_HISTORY_DELETED,
  UPDATE_STOCK_HISTORY,
  STOCK_HISTORY_UPDATED,
  GET_STOCK_HISTORIES_BY_PRODUCTVAR,
} from "../actions/types";

function* fetchStockHisById(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/stockhistory/${id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: STOCK_HISTORY_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
    let err = { ...error };
    if (err.status == 401) {
      this.props.history.push({
        pathname: "/admin/login",
      });
    }
  }
}

function* fetchStockHistoriesByProductVar(params) {
  try {
    const state = yield select(),
      { limit, page, query, idProductVar } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/stockhistory/productvar/${idProductVar}?limit=${limit}&page=${page}&query=${query}`,
        tokenConfig(state)
      )
    );

    yield put({ type: STOCK_HISTORIES_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
    let err = { ...error };
    if (err.status == 401) {
      this.props.history.push({
        pathname: "/seller/login",
      });
    }
  }
}

function* addStockHistory(params) {
  const state = yield select();
  console.log(params.newItem);
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/stockhistory/`,
        params.newItem,
        tokenConfig(state)
      )
    );

    yield put({ type: STOCK_HISTORY_ADDED, payload: response.data });
    yield put({
      type: GET_STOCK_HISTORIES_BY_PRODUCTVAR,
      pages: params.newItem.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateStockHistory(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/stockhistory/${params.newItem.id}`,
        params.newItem,
        tokenConfig(state)
      )
    );

    yield put({ type: STOCK_HISTORY_UPDATED, payload: response.data });
    yield put({
      type: GET_STOCK_HISTORIES_BY_PRODUCTVAR,
      pages: params.newItem.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* deleteStockHistory(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/stockhistory/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: STOCK_HISTORY_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sStockHistorySaga() {
  yield takeEvery(GET_STOCK_HISTORY_BY_ID, fetchStockHisById);
  yield takeEvery(
    GET_STOCK_HISTORIES_BY_PRODUCTVAR,
    fetchStockHistoriesByProductVar
  );
  yield takeEvery(ADD_STOCK_HISTORY, addStockHistory);
  yield takeEvery(UPDATE_STOCK_HISTORY, updateStockHistory);
  yield takeEvery(DELETE_STOCK_HISTORY, deleteStockHistory);
}
