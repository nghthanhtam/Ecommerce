import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { tokenAdminConfig } from "../actions/authAdminActions";
import { tokenUserConfig } from "../actions/authUserActions";
import {
  GET_PERMISSIONS,
  ADD_PERMISSION,
  PERMISSIONS_RECEIVED,
  PERMISSION_ADDED,
  DELETE_PERMISSION,
  PERMISSION_DELETED,
  UPDATE_PERMISSION,
  PERMISSION_UPDATED,
} from "../actions/types";

function* fetchPermissions(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/permission?limit=${limit}&page=${page}&query=${query}`,
        tokenConfig(state)
      )
    );
    console.log(response);
    yield put({ type: PERMISSIONS_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
  }
}

function* addPermission(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/permission/`,
        params.newPermission,
        params.newPermission.type == "user"
          ? tokenUserConfig(state)
          : tokenAdminConfig(state)
      )
    );

    yield put({ type: PERMISSION_ADDED, payload: response.data });
    yield put({
      type: GET_PERMISSIONS,
      pages: params.newPermission.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updatePermissionStt(params) {
  const state = yield select(),
    { id, status, pages } = params.params;

  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/permission/${id}/status`,
        { status },
        tokenAdminConfig(state)
      )
    );
    yield put({ type: PERMISSION_UPDATED, payload: response.data });
    yield put({ type: GET_PERMISSIONS, pages });
  } catch (error) {
    console.log({ ...error });
  }
}

function* updatePermission(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/permission/${params.newPermission.id}`,
        params.newPermission,
        tokenConfig(state)
      )
    );

    yield put({ type: PERMISSION_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deletePermission(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/permission/${params.id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PERMISSION_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sPermissionSaga() {
  yield takeEvery(GET_PERMISSIONS, fetchPermissions);
  yield takeEvery(ADD_PERMISSION, addPermission);
  yield takeEvery(UPDATE_PERMISSION, updatePermission);
  yield takeEvery(DELETE_PERMISSION, deletePermission);
}
