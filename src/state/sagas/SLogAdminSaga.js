import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import axios from "axios";
import { tokenAdminConfig } from "../actions/authAdminActions";
import {
  GET_LOGADMINS,
  LOGADMINS_RECEIVED,
  LOGADMIN_RECEIVED,
  GET_LOGADMIN_BY_ID,
  SHOW_MODAL,
  ADMIN_LOGOUT,
} from "../actions/types";

function* fetchLogAdmins(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_LOGGING}/api/adminlog?limit=${limit}&page=${page}&query=${query}`,
        tokenAdminConfig(state)
      )
    );
    console.log(response.data);
    yield put({ type: LOGADMINS_RECEIVED, payload: response });
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
      yield put({ type: ADMIN_LOGOUT });
    }
  }
}

function* fetchLogAdminById(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_LOGGING}/api/adminlog/${id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: LOGADMIN_RECEIVED, payload: response });
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

export default function* sLogAdminSaga() {
  yield takeEvery(GET_LOGADMINS, fetchLogAdmins);
  yield takeEvery(GET_LOGADMIN_BY_ID, fetchLogAdminById);
}
