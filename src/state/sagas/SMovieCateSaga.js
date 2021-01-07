import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenAdminConfig } from "../actions/authAdminActions";
import {
  GET_MOVIE_CATES,
  ADD_MOVIE_CATE,
  MOVIE_CATES_RECEIVED,
  MOVIE_CATE_ADDED,
  DELETE_MOVIE_CATE,
  MOVIE_CATE_DELETED,
  UPDATE_MOVIE_CATE,
  MOVIE_CATE_UPDATED,
  ADMIN_LOGOUT,
  GET_MOVIE_CATE_BY_ID,
  MOVIE_CATE_RECEIVED,
  SHOW_NOTI,
} from "../actions/types";
import { ADD_NOTIFICATION } from "react-redux-notify";
import { NOTI_SUCCESS } from "./NotificationObject";

function* fetchMovieCates(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/moviecat?limit=${limit}&page=${page}&query=${query}`,
          tokenAdminConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: MOVIE_CATES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* fetchMovieCateById(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/moviecat/${id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: MOVIE_CATE_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
    let err = { ...error };
    if (err.response.status == 401) {
      yield put({ type: ADMIN_LOGOUT });
      this.props.history.push({
        pathname: "/admin/login",
      });
    }
  }
}

function* addMovieCate(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/moviecat/`,
        params.newMovieCate,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: MOVIE_CATE_ADDED, payload: response.data });
    yield put({ type: SHOW_NOTI });
    yield put({
      type: ADD_NOTIFICATION,
      notification: NOTI_SUCCESS,
    });
    yield put({
      type: GET_MOVIE_CATES,
      pages: params.newMovieCate.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateMovieCate(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/moviecat/${params.newMovieCate.id}`,
        params.newMovieCate,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: MOVIE_CATE_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* deleteMovieCate(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/moviecat/${params.id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: MOVIE_CATE_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sMovieCateSaga() {
  yield takeEvery(GET_MOVIE_CATES, fetchMovieCates);
  yield takeEvery(GET_MOVIE_CATE_BY_ID, fetchMovieCateById);
  yield takeEvery(ADD_MOVIE_CATE, addMovieCate);
  yield takeEvery(UPDATE_MOVIE_CATE, updateMovieCate);
  yield takeEvery(DELETE_MOVIE_CATE, deleteMovieCate);
}
