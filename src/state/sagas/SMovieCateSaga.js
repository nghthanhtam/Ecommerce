import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { tokenConfig } from '../actions/authActions';
import {
  GET_MOVIE_CATES,
  ADD_MOVIE_CATE,
  MOVIE_CATES_RECEIVED,
  MOVIE_CATE_ADDED,
  DELETE_MOVIE_CATE,
  MOVIE_CATE_DELETED,
  UPDATE_MOVIE_CATE,
  MOVIE_CATE_UPDATED,
} from '../actions/types';

import mongoose from 'mongoose';

function* fetchMovieCates(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/moviecat?limit=${limit}&page=${page}&query=${query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: MOVIE_CATES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addMovie(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/moviecat/`,
        params.newMovieCate,
        tokenConfig(state)
      )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: MOVIE_CATE_ADDED, payload: response.data });
    yield put({
      type: GET_MOVIE_CATES,
      pages: params.newMovieCate.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateMovie(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/moviecat/${params.newMovieCate.id}`,
        params.newMovieCate,
        tokenConfig(state)
      )
    );

    yield put({ type: MOVIE_CATE_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deleteMovieCates(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/moviecat/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: MOVIE_CATE_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sMovieCateSaga() {
  yield takeEvery(GET_MOVIE_CATES, fetchMovieCates);
  yield takeEvery(ADD_MOVIE_CATE, addMovie);
  yield takeEvery(UPDATE_MOVIE_CATE, updateMovie);
  yield takeEvery(DELETE_MOVIE_CATE, deleteMovieCates);
}
