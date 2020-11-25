import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { tokenConfig } from '../actions/authActions';
import {
  USER_LOADED,
  USER_LOADING,
  USER_LOGIN,
  USER_LOGOUT,
  USER_AUTH_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_UPDATE_AUTH,
  ERRORS_RETURNED,
  USER_UPDATE_AUTH_SUCCESS,
} from '../actions/types';

function* loadUser() {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_USER}/api/authentication/user`,
        tokenConfig(state)
      )
    );

    //const response = yield call(getEmployees, { params: params, state: state });

    yield put({ type: USER_LOADED, payload: response.data });
  } catch (error) {
    //console.log(error.response.data);
    yield put({ type: USER_AUTH_ERROR, error });
  }
}

function* logout() {
  yield put({ type: USER_LOGOUT_SUCCESS });
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
        `${process.env.REACT_APP_BACKEND_USER}/api/authentication`,
        params.user,
        config
      )
    );

    const decodedData = jwt.decode(response.data.token);
    let res = { ...decodedData, token: response.data.token };

    yield put({ type: USER_LOGIN_SUCCESS, payload: res });
  } catch (error) {
    yield put({
      type: ERRORS_RETURNED,
      payload: {
        msg: error.response.data,
        status: error.response.status,
        id: 'LOGIN_FAIL',
      },
    });
    yield put({ type: USER_LOGIN_FAIL, error });
  }
}

function* updateAuthUser(params) {
  try {
    const decodedData = jwt.decode(params.token);
    if (!decodedData) throw new Error('Invalid token!');
    let res = { ...decodedData, token: params.token };
    yield put({ type: USER_UPDATE_AUTH_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: USER_LOGIN_FAIL, error });
  }
}

export default function* sAuthUserSaga() {
  yield takeEvery(USER_LOADING, loadUser);
  yield takeEvery(USER_LOGIN, login);
  yield takeEvery(USER_LOGOUT, logout);
  yield takeEvery(USER_UPDATE_AUTH, updateAuthUser);
}
