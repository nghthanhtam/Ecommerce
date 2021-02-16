import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import jwt from "jsonwebtoken";
import { tokenConfig } from "../actions/authActions";
import {
  EMPLOYEE_LOADED,
  EMPLOYEE_LOADING,
  EMPLOYEE_LOGIN,
  EMPLOYEE_LOGOUT,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_AUTH,
  ERRORS_RETURNED,
  UPDATE_AUTH_SUCCESS,
} from "../actions/types";

function* loadUser() {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/authentication/employee`,
        tokenConfig(state)
      )
    );

    //const response = yield call(getEmployees, { params: params, state: state });

    yield put({ type: EMPLOYEE_LOADED, payload: response.data });
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
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/authentication`,
        params.user,
        config
      )
    );

    const decodedData = jwt.decode(response.data.token);
    //   res = {};
    // res.user = decodedData.user;
    // res.role = decodedData.role;
    // res.token = response.data.token;
    let res = { ...decodedData, token: response.data.token };

    yield put({ type: LOGIN_SUCCESS, payload: res });
  } catch (error) {
    yield put({
      type: ERRORS_RETURNED,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
        id: "LOGIN_FAIL",
      },
    });
    yield put({ type: LOGIN_FAIL, error });
  }
}

function* updateAuth(params) {
  try {
    const decodedData = jwt.decode(params.token);
    if (!decodedData) throw new Error("Invalid token!");
    let res = { ...decodedData, token: params.token };
    yield put({ type: UPDATE_AUTH_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: LOGIN_FAIL, error });
  }
}

export default function* sAuthSaga() {
  yield takeEvery(EMPLOYEE_LOADING, loadUser);
  yield takeEvery(EMPLOYEE_LOGIN, login);
  yield takeEvery(EMPLOYEE_LOGOUT, logout);
  yield takeEvery(UPDATE_AUTH, updateAuth);
}
