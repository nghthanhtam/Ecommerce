import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenAdminConfig } from "../actions/authAdminActions";
import {
  GET_PROMOTIONS,
  ADD_PROMOTION,
  PROMOTIONS_RECEIVED,
  PROMOTION_RECEIVED,
  PROMOTION_ADDED,
  DELETE_PROMOTION,
  PROMOTION_DELETED,
  UPDATE_PROMOTION,
  PROMOTION_UPDATED,
  GET_PROMOTION_BY_ID,
} from "../actions/types";

function* fetchPromotions(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;
    console.log(params);
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_PROMOTION}/api/promotion?limit=${limit}&page=${page}&query=${query}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PROMOTIONS_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
    let err = { ...error };
    if (err.status == 401) {
      this.props.history.push({
        pathname: "/admin/login",
      });
    }
  }
}

function* fetchPromotionById(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_PROMOTION}/api/promotion/${id}`,
        tokenAdminConfig(state)
      )
    );
    if (response.data) {
      console.log(response.data);
      let timeEnd = response.data.timeEnd,
        timeStart = response.data.timeStart;
      response.data.timeEnd = new Date(timeEnd).toISOString().slice(0, 16);
      response.data.timeStart = new Date(timeStart).toISOString().slice(0, 16);
    }
    yield put({ type: PROMOTION_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.status == 401) {
      this.props.history.push({
        pathname: "/admin/login",
      });
    }
  }
}

function* addPromotion(params) {
  const state = yield select();
  console.log(params);
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_PROMOTION}/api/promotion/`,
        params.newPromotion,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PROMOTION_ADDED, payload: response.data });
    yield put({
      type: GET_PROMOTIONS,
      pages: params.newPromotion.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updatePromotion(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PROMOTION}/api/promotion/${params.newPromotion.id}`,
        params.newPromotion,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PROMOTION_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* deletePromotion(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PROMOTION}/api/promotion/${params.id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PROMOTION_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sPromotionSaga() {
  yield takeEvery(GET_PROMOTIONS, fetchPromotions);
  yield takeEvery(GET_PROMOTION_BY_ID, fetchPromotionById);
  yield takeEvery(ADD_PROMOTION, addPromotion);
  yield takeEvery(UPDATE_PROMOTION, updatePromotion);
  yield takeEvery(DELETE_PROMOTION, deletePromotion);
}
