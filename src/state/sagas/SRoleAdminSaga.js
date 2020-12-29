import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import axios from "axios";
import { history } from "../../App";
import { tokenAdminConfig } from "../actions/authAdminActions";
import {
  GET_ROLEADMINS,
  ADD_ROLEADMIN,
  ROLEADMINS_RECEIVED,
  ROLEADMIN_ADDED,
  DELETE_ROLEADMIN,
  ROLEADMIN_DELETED,
  UPDATE_ROLEADMIN,
  ROLEADMIN_UPDATED,
  GET_ROLEADMIN_BY_ID,
  ROLEADMIN_RECEIVED,
  ADMIN_LOGOUT,
  SHOW_MODAL,
} from "../actions/types";

function* fetchRoleAdmins(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/adminrole?limit=${limit}&page=${page}&query=${query}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ROLEADMINS_RECEIVED, payload: response });
  } catch (error) {
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

function* fetchRoleAdminById(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/adminrole/${id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ROLEADMIN_RECEIVED, payload: response });
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

function* addRoleAdmin(params) {
  const state = yield select();
  console.log(params);
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/adminrole/`,
        params.newRoleAdmin,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ROLEADMIN_ADDED, payload: response.data });
    yield put({
      type: GET_ROLEADMINS,
      pages: params.newRoleAdmin.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateRoleAdmin(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/adminrole/${params.newRoleAdmin.id}`,
        params.newRoleAdmin,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ROLEADMIN_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* deleteRoleAdmin(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_ADMIN}/api/adminrole/${params.id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ROLEADMIN_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sRoleAdminSaga() {
  yield takeEvery(GET_ROLEADMIN_BY_ID, fetchRoleAdminById);
  yield takeEvery(GET_ROLEADMINS, fetchRoleAdmins);
  yield takeEvery(ADD_ROLEADMIN, addRoleAdmin);
  yield takeEvery(UPDATE_ROLEADMIN, updateRoleAdmin);
  yield takeEvery(DELETE_ROLEADMIN, deleteRoleAdmin);
}
