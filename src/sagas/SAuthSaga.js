import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  USER_LOADED,
  USER_LOADING,
  USER_LOGIN,
  USER_LOGOUT,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  GET_ERRORS,
  ERRORS_RETURNED,
} from "../actions/types";

function* loadUser() {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/auth/user`,
        tokenConfig(state)
      )
    );

    //const response = yield call(getCategories, { params: params, state: state });
    yield put({ type: USER_LOADED, payload: response.data });
  } catch (error) {
    //console.log(error.response.data);
    yield put({ type: AUTH_ERROR, error });
  }
}

function* logout() {
  yield put({ type: LOGOUT_SUCCESS });
}

function* login(params) {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/auth`,
        params.user,
        config
      )
    );
    yield put({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    yield put({
      type: ERRORS_RETURNED,
      payload: {
        msg: error.response.data,
        status: error.response.status,
        id: "LOGIN_FAIL",
      },
    });
    yield put({ type: LOGIN_FAIL, error });
  }
}

export default function* sAuthSaga() {
  yield takeEvery(USER_LOADING, loadUser);
  yield takeEvery(USER_LOGIN, login);
  yield takeEvery(USER_LOGOUT, logout);
}
