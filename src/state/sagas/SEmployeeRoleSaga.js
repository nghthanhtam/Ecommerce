import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { tokenConfig } from '../actions/authActions';
import {
  GET_EMPROLES,
  ADD_EMPROLE,
  EMPROLES_RECEIVED,
  EMPROLE_ADDED,
  DELETE_EMPROLE,
  EMPROLE_DELETED,
  UPDATE_EMPROLE,
  EMPROLE_UPDATED,
} from '../actions/types';

import mongoose from 'mongoose';

function* fetchEmpRoles(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;
    console.log(params.pages);
    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_HOST}/api/employeerole?limit=${limit}&page=${page}&query=${query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: EMPROLES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addEmpRole(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/employeerole/`,
        params.newEmpRole,
        tokenConfig(state)
      )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: EMPROLE_ADDED, payload: response.data });
    yield put({
      type: GET_EMPROLES,
      pages: params.newEmpRole.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateEmpRole(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_HOST}/api/employeerole/${params.newEmpRole.id}`,
        params.newEmpRole,
        tokenConfig(state)
      )
    );

    yield put({ type: EMPROLE_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* deleteEmpRoles(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}/api/employeerole/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: EMPROLE_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sEmpRoleSaga() {
  yield takeEvery(GET_EMPROLES, fetchEmpRoles);
  yield takeEvery(ADD_EMPROLE, addEmpRole);
  yield takeEvery(UPDATE_EMPROLE, updateEmpRole);
  yield takeEvery(DELETE_EMPROLE, deleteEmpRoles);
}
