import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_ROLES,
  ADD_ROLE,
  ROLES_RECEIVED,
  ROLE_ADDED,
  DELETE_ROLE,
  ROLE_DELETED,
  UPDATE_ROLE,
  ROLE_UPDATED,
  GET_ROLE_BY_ID,
  ROLE_RECEIVED,
} from "../actions/types";

function* fetchRoles(params) {
  try {
    const state = yield select(),
      { limit, page, query, idShop } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/EmployeeRole/shop/${idShop}?limit=${limit}&page=${page}&query=${query}`,
        tokenConfig(state)
      )
    );

    yield put({ type: ROLES_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
  }
}

function* fetchRoleById(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/EmployeeRole/${id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: ROLE_RECEIVED, payload: response });
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

function* addRole(params) {
  const state = yield select();
  console.log(params);
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/EmployeeRole/`,
        params.newRole,
        tokenConfig(state)
      )
    );

    yield put({ type: ROLE_ADDED, payload: response.data });
    yield put({
      type: GET_ROLES,
      pages: params.newRole.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateRole(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/EmployeeRole/${params.newRole.id}`,
        params.newRole,
        tokenConfig(state)
      )
    );

    yield put({ type: ROLE_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* deleteRole(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/EmployeeRole/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: ROLE_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sRoleSaga() {
  yield takeEvery(GET_ROLE_BY_ID, fetchRoleById);
  yield takeEvery(GET_ROLES, fetchRoles);
  yield takeEvery(ADD_ROLE, addRole);
  yield takeEvery(UPDATE_ROLE, updateRole);
  yield takeEvery(DELETE_ROLE, deleteRole);
}
