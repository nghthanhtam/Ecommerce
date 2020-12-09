import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  AUTH_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_UPDATE_AUTH,
  ERRORS_RETURNED,
  ADMIN_UPDATE_AUTH_SUCCESS,
} from '../actions/types';

function* logout() {
  yield put({ type: ADMIN_LOGOUT_SUCCESS });
}

function* login(params) {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/authentication`,
        params.admin,
        config
      )
    );

    const decodedData = jwt.decode(response.data.token);
    let res = { ...decodedData, token: response.data.token };

    yield put({ type: ADMIN_LOGIN_SUCCESS, payload: res });
  } catch (error) {
    yield put({
      type: ERRORS_RETURNED,
      payload: {
        msg: error.response.data,
        status: error.response.status,
        id: 'ADMIN_LOGIN_FAIL',
      },
    });
    yield put({ type: ADMIN_LOGIN_FAIL, error });
  }
}

function* updateAuth(params) {
  try {
    const decodedData = jwt.decode(params.token);
    if (!decodedData) throw new Error('Invalid token!');
    let res = { ...decodedData, token: params.token };
    yield put({ type: ADMIN_UPDATE_AUTH_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: ADMIN_LOGIN_FAIL, error });
  }
}

export default function* sAuthSaga() {
  yield takeEvery(ADMIN_LOGIN, login);
  yield takeEvery(ADMIN_LOGOUT, logout);
  yield takeEvery(ADMIN_UPDATE_AUTH, updateAuth);
}
