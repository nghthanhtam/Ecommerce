import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenAdminConfig } from "../actions/authAdminActions";
import {
  GET_MOVIES,
  ADD_MOVIE,
  MOVIES_RECEIVED,
  MOVIE_ADDED,
  DELETE_MOVIE,
  MOVIE_DELETED,
  UPDATE_MOVIE,
  MOVIE_UPDATED,
  GET_MOVIE_BY_ID,
  MOVIE_RECEIVED,
} from "../actions/types";

function* fetchMovies(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;
    console.log(params.pages);
    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/movie?limit=${limit}&page=${page}&query=${query}`,
          tokenAdminConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: MOVIES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* fetchMovieById(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/movie/${id}`,
        tokenAdminConfig(state)
      )
    );
    yield put({ type: MOVIE_RECEIVED, payload: response });
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

function* addMovie(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/movie/`,
        params.newMovie,
        tokenAdminConfig(state)
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
        tokenAdminConfig(state)
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
        tokenAdminConfig(state)
      )
    );

    yield put({ type: MOVIE_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sMovieSaga() {
  yield takeEvery(GET_MOVIE_BY_ID, fetchMovieById);
  yield takeEvery(GET_MOVIES, fetchMovies);
  yield takeEvery(ADD_MOVIE, addMovie);
  yield takeEvery(UPDATE_MOVIE, updateMovie);
  yield takeEvery(DELETE_MOVIE, deleteMovie);
}
