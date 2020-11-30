import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { tokenConfig } from '../actions/authActions';
import {
  GET_MOVIES,
  ADD_MOVIE,
  MOVIES_RECEIVED,
  MOVIE_ADDED,
  DELETE_MOVIE,
  MOVIE_DELETED,
  UPDATE_MOVIE,
  MOVIE_UPDATED,
} from '../actions/types';

import mongoose from 'mongoose';

function* fetchMovies(params) {
  try {
    const state = yield select(),
      { limit, page, query, idShop } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/movie?limit=${limit}&page=${page}&query=${query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: MOVIES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addMovie(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/movie/`,
        params.newMovie,
        tokenConfig(state)
      )
    );

    yield put({ type: MOVIE_ADDED, payload: response.data });
    yield put({
      type: GET_MOVIES,
      pages: params.newMovie.pages,
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
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/movie/${params.newMovie.id}`,
        params.newMovie,
        tokenConfig(state)
      )
    );

    yield put({ type: MOVIE_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deleteMovie(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/movie/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: MOVIE_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sMovieSaga() {
  yield takeEvery(GET_MOVIES, fetchMovies);
  yield takeEvery(ADD_MOVIE, addMovie);
  yield takeEvery(UPDATE_MOVIE, updateMovie);
  yield takeEvery(DELETE_MOVIE, deleteMovie);
}
