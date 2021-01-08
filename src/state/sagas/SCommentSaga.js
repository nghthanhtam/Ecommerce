import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { tokenAdminConfig } from "../actions/authAdminActions";
import { tokenUserConfig } from "../actions/authUserActions";
import {
  GET_COMMENTS,
  ADD_COMMENT,
  COMMENTS_RECEIVED,
  COMMENT_ADDED,
  DELETE_COMMENT,
  COMMENT_DELETED,
  UPDATE_COMMENT,
  COMMENT_UPDATED,
  UPDATE_COMMENT_STATUS,
  GET_RATINGS_BY_PRODUCT,
} from "../actions/types";

function* fetchComments(params) {
  try {
    const state = yield select(),
      { limit, page, query, status } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_RATING}/api/comment?limit=${limit}&page=${page}&query=${query}&status=${status}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: COMMENTS_RECEIVED, payload: response });
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

function* addComment(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_RATING}/api/comment/`,
        params.newCmt,
        params.newCmt.type == "user"
          ? tokenUserConfig(state)
          : tokenAdminConfig(state)
      )
    );

    yield put({ type: COMMENT_ADDED, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* updateCommentStt(params) {
  const state = yield select(),
    { id, status, pages } = params.params;

  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_RATING}/api/comment/${id}/status`,
        { status },
        tokenAdminConfig(state)
      )
    );
    yield put({ type: COMMENT_UPDATED, payload: response.data });
    yield put({ type: GET_COMMENTS, pages });
  } catch (error) {
    console.log(error);
  }
}

function* updateComment(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_RATING}/api/comment/${params.newCmt.id}`,
        params.newCmt,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: COMMENT_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* deleteComment(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_RATING}/api/comment/${params.id}`,
        tokenAdminConfig(state)
      )
    );
    yield put({ type: COMMENT_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sCommentSaga() {
  yield takeEvery(GET_COMMENTS, fetchComments);
  yield takeEvery(ADD_COMMENT, addComment);
  yield takeEvery(UPDATE_COMMENT, updateComment);
  yield takeEvery(UPDATE_COMMENT_STATUS, updateCommentStt);
  yield takeEvery(DELETE_COMMENT, deleteComment);
}
