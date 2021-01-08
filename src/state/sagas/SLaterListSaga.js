import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenUserConfig } from "../actions/authUserActions";
import {
  GET_LATERLISTS,
  ADD_LATERLIST,
  LATERLISTS_RECEIVED,
  LATERLIST_ADDED,
  DELETE_LATERLIST,
  LATERLIST_DELETED,
  UPDATE_LATERLIST,
  LATERLIST_UPDATED,
  GET_RATINGS_BY_PRODUCT,
} from "../actions/types";

function* fetchLaterLists(params) {
  try {
    const state = yield select(),
      { limit, page, idUser } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_USER}/api/laterbuy/user/${idUser}?limit=${limit}&page=${page}`,
        tokenUserConfig(state)
      )
    );
    console.log(response);
    yield put({ type: LATERLISTS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/shopnow/login",
      });
    }
  }
}

function* addLaterList(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_USER}/api/laterbuy/`,
        params.newItem,
        tokenUserConfig
      )
    );

    yield put({ type: LATERLIST_ADDED, payload: response.data });
    yield put({
      type: GET_RATINGS_BY_PRODUCT,
      pages: { limit: 1000, page: 1, idUser: params.newItem.idUser },
    });
  } catch (error) {
    console.log(error);
  }
}

function* updateLaterList(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_USER}/api/laterbuy/${params.newItem.id}`,
        params.newItem,
        tokenUserConfig(state)
      )
    );

    yield put({ type: LATERLIST_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* deleteLaterList(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_USER}/api/laterbuy/${params.id}`,
        tokenUserConfig(state)
      )
    );
    yield put({ type: LATERLIST_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sLaterListSaga() {
  yield takeEvery(GET_LATERLISTS, fetchLaterLists);
  yield takeEvery(ADD_LATERLIST, addLaterList);
  yield takeEvery(UPDATE_LATERLIST, updateLaterList);
  yield takeEvery(DELETE_LATERLIST, deleteLaterList);
}
