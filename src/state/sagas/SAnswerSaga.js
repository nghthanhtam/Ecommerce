import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenUserConfig } from "../actions/authUserActions";
import { tokenAdminConfig } from "../actions/authAdminActions";
import {
  GET_ANSWERS,
  ADD_ANSWER,
  ANSWERS_RECEIVED,
  ANSWER_ADDED,
  DELETE_ANSWER,
  ANSWER_DELETED,
  UPDATE_ANSWER,
  ANSWER_UPDATED,
  UPDATE_ANSWER_STATUS,
  GET_QUESTIONS_BY_PRODUCT,
} from "../actions/types";

function* fetchAnswers(params) {
  try {
    const state = yield select(),
      { limit, page, query, status } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_RATING}/api/answer?limit=${limit}&page=${page}&query=${query}&status=${status}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ANSWERS_RECEIVED, payload: response });
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

function* addAnswer(params) {
  const state = yield select(),
    { type, idProduct } = params.newAnswer;

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_RATING}/api/answer/`,
        params.newAnswer,
        type == "user" ? tokenUserConfig(state) : tokenAdminConfig(state)
      )
    );

    yield put({ type: ANSWER_ADDED, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* updateAnswerStt(params) {
  const state = yield select(),
    { id, status, pages } = params.params;
  console.log(pages);
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_RATING}/api/answer/${id}/status`,
        { status },
        tokenAdminConfig(state)
      )
    );
    yield put({ type: ANSWER_UPDATED, payload: response.data });
    yield put({ type: GET_ANSWERS, pages });
  } catch (error) {
    console.log(error);
  }
}

function* updateAnswer(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_RATING}/api/answer/${params.newCmt.id}`,
        params.newCmt,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ANSWER_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* deleteAnswer(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_RATING}/api/answer/${params.id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: ANSWER_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sAnswerSaga() {
  yield takeEvery(GET_ANSWERS, fetchAnswers);
  yield takeEvery(ADD_ANSWER, addAnswer);
  yield takeEvery(UPDATE_ANSWER, updateAnswer);
  yield takeEvery(UPDATE_ANSWER_STATUS, updateAnswerStt);
  yield takeEvery(DELETE_ANSWER, deleteAnswer);
}
