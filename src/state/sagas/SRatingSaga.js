import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { tokenAdminConfig } from "../actions/authAdminActions";
import { tokenUserConfig } from "../actions/authUserActions";
import {
  GET_RATINGS,
  ADD_RATING,
  RATINGS_RECEIVED,
  RATING_ADDED,
  DELETE_RATING,
  RATING_DELETED,
  UPDATE_RATING,
  RATING_UPDATED,
  UPDATE_RATING_STATUS,
  GET_RATINGS_BY_PRODUCT,
} from "../actions/types";

function* fetchRatings(params) {
  try {
    const state = yield select(),
      { limit, page, query, status } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_RATING}/api/rating?limit=${limit}&page=${page}&query=${query}&status=${status}`,
        tokenConfig(state)
      )
    );

    yield put({ type: RATINGS_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
  }
}

function* fetchRatingsByProduct(params) {
  try {
    const state = yield select(),
      { limit, page, idProduct } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_RATING}/api/rating/product/${idProduct}?limit=${limit}&page=${page}`,
        tokenConfig(state)
      )
    );
    console.log(response);
    yield put({ type: RATINGS_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
  }
}

function* addRating(params) {
  const state = yield select(),
    { idProduct, type } = params.newRating;
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_RATING}/api/rating/`,
        params.newRating,
        type == "user" ? tokenUserConfig(state) : tokenAdminConfig(state)
      )
    );

    yield put({ type: RATING_ADDED, payload: response.data });
    yield put({
      type: GET_RATINGS_BY_PRODUCT,
      pages: { limit: 1000, page: 1, idProduct },
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateRatingStt(params) {
  const state = yield select(),
    { id, status, pages } = params.params;

  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_RATING}/api/rating/${id}/status`,
        { status },
        tokenAdminConfig(state)
      )
    );
    yield put({ type: RATING_UPDATED, payload: response.data });
    yield put({ type: GET_RATINGS, pages });
  } catch (error) {
    console.log({ ...error });
  }
}

function* updateRating(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_RATING}/api/rating/${params.newRating.id}`,
        params.newRating,
        tokenConfig(state)
      )
    );

    yield put({ type: RATING_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deleteRating(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_RATING}/api/rating/${params.id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: RATING_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sRatingSaga() {
  yield takeEvery(GET_RATINGS_BY_PRODUCT, fetchRatingsByProduct);
  yield takeEvery(GET_RATINGS, fetchRatings);
  yield takeEvery(ADD_RATING, addRating);
  yield takeEvery(UPDATE_RATING, updateRating);
  yield takeEvery(UPDATE_RATING_STATUS, updateRatingStt);
  yield takeEvery(DELETE_RATING, deleteRating);
}
