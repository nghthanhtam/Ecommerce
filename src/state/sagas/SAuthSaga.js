import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { tokenConfig } from '../actions/authActions';
import {
  USER_LOADED,
  USER_LOADING,
  USER_LOGIN,
  USER_LOGOUT,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_AUTH,
  ERRORS_RETURNED,
  UPDATE_AUTH_SUCCESS,
} from '../actions/types';

function* loadUser() {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}/api/authentication/user`,
        tokenConfig(state)
      )
    );

    //const response = yield call(getEmployees, { params: params, state: state });

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
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/authentication`,
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
        msg: error.response.data,
        status: error.response.status,
        id: 'LOGIN_FAIL',
      },
    });
    yield put({ type: LOGIN_FAIL, error });
  }
}

function* updateAuth(params) {
  try {
    const decodedData = jwt.decode(params.token);
    if (!decodedData) throw new Error('Invalid token!');
    let res = { ...decodedData, token: params.token };
    yield put({ type: UPDATE_AUTH_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: LOGIN_FAIL, error });
  }
}

export default function* sAuthSaga() {
  yield takeEvery(USER_LOADING, loadUser);
  yield takeEvery(USER_LOGIN, login);
  yield takeEvery(USER_LOGOUT, logout);
  yield takeEvery(UPDATE_AUTH, updateAuth);
}
