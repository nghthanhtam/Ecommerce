import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenAdminConfig } from "../actions/authAdminActions";
import {
  GET_PROMOTIONTYPES,
  ADD_PROMOTIONTYPE,
  PROMOTIONTYPES_RECEIVED,
  PROMOTIONTYPE_RECEIVED,
  PROMOTIONTYPE_ADDED,
  DELETE_PROMOTIONTYPE,
  PROMOTIONTYPE_DELETED,
  UPDATE_PROMOTIONTYPE,
  PROMOTIONTYPE_UPDATED,
  GET_PROMOTIONTYPE_BY_ID,
} from "../actions/types";

function* fetchPromotionTypes(params) {
  try {
    const state = yield select(),
      { limit, page } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_PROMOTION}/api/promotiontype?limit=${limit}&page=${page}`,
        tokenAdminConfig(state)
      )
    );
    yield put({ type: PROMOTIONTYPES_RECEIVED, payload: response });
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

function* fetchPromotionTypeById(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_PROMOTION}/api/promotiontype/${id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PROMOTIONTYPE_RECEIVED, payload: response });
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

function* addPromotionType(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_PROMOTION}/api/promotiontype/`,
        params.newPromotionType,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PROMOTIONTYPE_ADDED, payload: response.data });
    yield put({
      type: GET_PROMOTIONTYPES,
      pages: params.newPromotionType.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updatePromotionType(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PROMOTION}/api/promotiontype/${params.newPromotionType.id}`,
        params.newPromotionType,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PROMOTIONTYPE_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* deletePromotionType(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PROMOTION}/api/promotiontype/${params.id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PROMOTIONTYPE_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sPromotionTypeSaga() {
  yield takeEvery(GET_PROMOTIONTYPES, fetchPromotionTypes);
  yield takeEvery(GET_PROMOTIONTYPE_BY_ID, fetchPromotionTypeById);
  yield takeEvery(ADD_PROMOTIONTYPE, addPromotionType);
  yield takeEvery(UPDATE_PROMOTIONTYPE, updatePromotionType);
  yield takeEvery(DELETE_PROMOTIONTYPE, deletePromotionType);
}
