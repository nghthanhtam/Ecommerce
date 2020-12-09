import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { tokenConfig } from '../actions/authActions';
import { tokenAdminConfig } from '../actions/authAdminActions';
import {
  GET_QUESTIONS,
  ADD_QUESTION,
  QUESTIONS_RECEIVED,
  QUESTION_ADDED,
  DELETE_QUESTION,
  QUESTION_DELETED,
  UPDATE_QUESTION,
  QUESTION_UPDATED,
  UPDATE_QUESTION_STATUS
} from '../actions/types';

function* fetchQuestions(params) {
  try {
    const state = yield select(),
      { limit, page, query, status } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_RATING}/api/question?limit=${limit}&page=${page}&query=${query}&status=${status}`,
          tokenConfig(state)
        )
    );

    yield put({ type: QUESTIONS_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
    let err = { ...error }
    if (err.status == 401) {
      this.props.history.push({
        pathname: '/admin/login',
      });
    }
  }
}

function* addQuestion(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_RATING}/api/question/`,
        params.newQuestion,
        tokenConfig(state)
      )
    );

    yield put({ type: QUESTION_ADDED, payload: response.data });
    yield put({
      type: GET_QUESTIONS,
      pages: params.newQuestion.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateQuestion(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_RATING}/api/question/${params.newQuestion.id}`,
        params.newQuestion,
        tokenConfig(state)
      )
    );

    yield put({ type: QUESTION_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deleteQuestion(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_RATING}/api/question/${params.id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: QUESTION_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateQuestionStt(params) {
  const state = yield select(),
    { id, status } = params.params

  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_RATING}/api/question/${id}/status`,
        { status },
        tokenAdminConfig(state)
      )
    );
    yield put({ type: QUESTION_UPDATED, payload: response.data });
  } catch (error) {
    console.log({ ...error });
  }
}

export default function* sQuestionSaga() {
  yield takeEvery(GET_QUESTIONS, fetchQuestions);
  yield takeEvery(ADD_QUESTION, addQuestion);
  yield takeEvery(UPDATE_QUESTION, updateQuestion);
  yield takeEvery(UPDATE_QUESTION_STATUS, updateQuestionStt);
  yield takeEvery(DELETE_QUESTION, deleteQuestion);
}
