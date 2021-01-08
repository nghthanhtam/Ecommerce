import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_LOGSELLERS,
  LOGSELLERS_RECEIVED,
  LOGSELLER_RECEIVED,
  GET_LOGSELLER_BY_ID,
  SHOW_MODAL,
  EMPLOYEE_LOGOUT,
} from "../actions/types";

function* fetchLogSellers(params) {
  try {
    const state = yield select(),
      { limit, page, query, idShop } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_LOGGING}/api/shoplog/shop/${idShop}?limit=${limit}&page=${page}&query=${query}`,
        tokenConfig(state)
      )
    );
    console.log(response.data);
    yield put({ type: LOGSELLERS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.response.status == 401) {
      yield put({
        type: SHOW_MODAL,
        payload: { show: true, modalName: "modalExpire" },
      });
      yield delay(2000);
      yield put({
        type: SHOW_MODAL,
        payload: { show: false },
      });
      yield put({ type: EMPLOYEE_LOGOUT });
    }
  }
}

function* fetchLogSellerById(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_LOGGING}/api/shoplog/${id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: LOGSELLER_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/seller/login",
      });
    }
  }
}

export default function* sLogSellerSaga() {
  yield takeEvery(GET_LOGSELLERS, fetchLogSellers);
  yield takeEvery(GET_LOGSELLER_BY_ID, fetchLogSellerById);
}
