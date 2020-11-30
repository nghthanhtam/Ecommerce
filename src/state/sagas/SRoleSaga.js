import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_ROLES,
  ADD_ROLE,
  ROLES_RECEIVED,
  ROLES_ADDED,
  DELETE_ROLE,
  ROLE_DELETED,
  UPDATE_ROLE,
  ROLE_UPDATED,
} from "../actions/types";

import mongoose from "mongoose";

function* fetchRoles(params) {
  try {
    console.log(params);
    if (params.pages.query === "") params.pages.query = "undefined";
    const state = yield select();

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_HOST}/api/role/${params.pages.select}/${params.pages.currentPage}/${params.pages.query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: ROLES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addRoles(params) {
  const state = yield select();
  console.log(params);
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/role/`,
        params.newRole,
        tokenConfig(state)
      )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: ROLES_ADDED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateRole(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_HOST}/api/role/${params.newRole._id}`,
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
    const response = yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}/api/role/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: ROLE_DELETED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sRoleSaga() {
  yield takeEvery(GET_ROLES, fetchRoles);
  yield takeEvery(ADD_ROLE, addRoles);
  yield takeEvery(UPDATE_ROLE, updateRole);
  yield takeEvery(DELETE_ROLE, deleteRole);
}
