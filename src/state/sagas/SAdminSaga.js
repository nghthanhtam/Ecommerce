import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import axios from "axios";
import jwt from "jsonwebtoken";
import { tokenAdminConfig } from "../actions/authAdminActions";
import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_UPDATE_AUTH,
  ERRORS_RETURNED,
  ADMIN_UPDATE_AUTH_SUCCESS,
  ADMIN_DELETED,
  GET_ADMINS,
  GET_ADMIN_BY_ID,
  ADD_ADMIN,
  UPDATE_ADMIN,
  DELETE_ADMIN,
  ADMINS_RECEIVED,
  ADMIN_ADDED,
  ADMIN_RECEIVED,
  ADMIN_UPDATED,
  SHOW_MODAL,
  SHOW_NOTI,
} from "../actions/types";
import { ADD_NOTIFICATION } from "react-redux-notify";
import { NOTI_SUCCESS } from "./NotificationObject";

function* logout() {
  yield put({ type: ADMIN_LOGOUT_SUCCESS });
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
        msg: error.response.data.msg,
        status: error.response.status,
        id: "ADMIN_LOGIN_FAIL",
      },
    });
    yield put({ type: ADMIN_LOGIN_FAIL, error });
  }
}

function* updateAuth(params) {
  try {
    const decodedData = jwt.decode(params.token);
    if (!decodedData) throw new Error("Invalid token!");
    let res = { ...decodedData, token: params.token };
    yield put({ type: ADMIN_UPDATE_AUTH_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: ADMIN_LOGIN_FAIL, error });
  }
}

function* fetchAdminById(params) {
  console.log("----------------", params);
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/admin/${id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ADMIN_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.response.status == 401) {
      yield put({ type: ADMIN_LOGOUT });
      this.props.history.push({
        pathname: "/admin/login",
      });
    }
  }
}

function* fetchAdmins(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/admin?limit=${limit}&page=${page}&query=${query}`,
        tokenAdminConfig(state)
      )
    );
    yield put({ type: ADMINS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    error = { ...error };
    if (error.response.status == 401) {
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

function* addAdmin(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/admin/`,
        params.newEmp,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ADMIN_ADDED, payload: response.data });
    yield put({ type: SHOW_NOTI });
    yield put({
      type: ADD_NOTIFICATION,
      notification: NOTI_SUCCESS,
    });
    yield put({
      type: GET_ADMINS,
      pages: params.newEmp.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateAdmin(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/admin/${params.newEmp.id}`,
        params.newEmp,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ADMIN_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* deleteAdmin(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/admin/${params.id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ADMIN_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sAuthSaga() {
  yield takeEvery(ADMIN_LOGIN, login);
  yield takeEvery(ADMIN_LOGOUT, logout);
  yield takeEvery(ADMIN_UPDATE_AUTH, updateAuth);
  yield takeEvery(GET_ADMINS, fetchAdmins);
  yield takeEvery(GET_ADMIN_BY_ID, fetchAdminById);
  yield takeEvery(ADD_ADMIN, addAdmin);
  yield takeEvery(UPDATE_ADMIN, updateAdmin);
  yield takeEvery(DELETE_ADMIN, deleteAdmin);
}
