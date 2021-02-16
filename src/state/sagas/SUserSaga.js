import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { tokenUserConfig, noTokenConfig } from "../actions/authUserActions";
import { tokenAdminConfig } from "../actions/authAdminActions";
import {
  GET_USERS,
  ADD_USER,
  USERS_RECEIVED,
  USER_RECEIVED,
  USER_ADDED,
  DELETE_USER,
  USER_DELETED,
  UPDATE_USER,
  USER_UPDATED,
  GET_USER_BY_ID,
  UPDATE_PASS,
  USER_PASS_UPDATED_ERROR,
  SHOW_NOTI,
  ERRORS_RETURNED,
  ADD_SURVEY,
  SURVEY_ADDED,
  USER_LOGOUT,
  SHOW_MODAL,
} from "../actions/types";
import { ADD_NOTIFICATION } from "react-redux-notify";
import { NOTI_SUCCESS } from "./NotificationObject";

function* fetchUsers(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_USER}/api/user?limit=${limit}&page=${page}&query=${query}`,
        tokenAdminConfig(state)
      )
    );
    yield put({ type: USERS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/login",
      });
    }
  }
}

function* fetchUserById(params) {
  try {
    const state = yield select(),
      { id, type } = params.params;
    console.log(params);
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_USER}/api/user/${id}`,
        type == "user" ? tokenUserConfig(state) : tokenAdminConfig(state)
      )
    );

    yield put({ type: USER_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addSurvey(params) {
  const state = yield select();
  const { newItem } = params;
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_USER}/api/survey/`,
        newItem,
        tokenUserConfig(state)
      )
    );
    yield put({ type: SURVEY_ADDED, payload: response });
    yield put({
      type: SHOW_MODAL,
      payload: { show: true, modalName: "modalExpire" },
    });
    yield delay(1500);
    yield put({
      type: SHOW_MODAL,
      payload: { show: false },
    });
    yield put({ type: USER_LOGOUT });
  } catch (error) {
    console.log(error);
  }
}

function* addUser(params) {
  const state = yield select();
  const { newUser } = params;
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_USER}/api/user/`,
        newUser,
        (newUser.type = "user" ? noTokenConfig(state) : tokenAdminConfig(state))
      )
    );

    yield put({ type: USER_ADDED, payload: response });
    newUser.type = "user"
      ? null
      : yield put({
          type: GET_USERS,
          pages: newUser.pages,
        });
  } catch (error) {
    let err = { ...error };
    console.log(err);
    if (err.response.data.errors[0]) {
      let errObj = err.response.data.errors[0];
      if (errObj.msg == "Username is in use") {
        yield put({
          type: ERRORS_RETURNED,
          payload: {
            id: "ERROR_USERNAME",
            msg: "Tên đăng nhập đã được sử dụng",
            status: err.response.status,
            newUser,
          },
        });
      } else if (errObj.msg == "Phone is in use") {
        yield put({
          type: ERRORS_RETURNED,
          payload: {
            id: "ERROR_PHONE",
            msg: "Số điện thoại đã được sử dụng",
            status: err.response.status,
            newUser,
          },
        });
      } else if (errObj.msg == "Email is in use") {
        yield put({
          type: ERRORS_RETURNED,
          payload: {
            id: "ERROR_EMAIL",
            msg: "Địa chỉ email đã được sử dụng",
            status: err.response.status,
            newUser,
          },
        });
      }
    }
  }
}

function* updateUser(params) {
  const state = yield select();
  const { newUser } = params;
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_USER}/api/user/${newUser.id}`,
        newUser,
        newUser.type == "user"
          ? tokenUserConfig(state)
          : tokenAdminConfig(state)
      )
    );

    yield put({ type: USER_UPDATED, payload: response.data });
    yield put({ type: SHOW_NOTI });
    yield put({
      type: ADD_NOTIFICATION,
      notification: NOTI_SUCCESS,
    });
  } catch (error) {
    console.log(error);
  }
}

function* updatePass(params) {
  const state = yield select();
  const { type, id, oldPassword, newPassword, confirmPassword } = params.params;
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_USER}/api/user/password/${id}`,
        { oldPassword, newPassword, confirmPassword },
        type == "user" ? tokenUserConfig(state) : tokenAdminConfig(state)
      )
    );

    yield put({ type: USER_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error);
    yield put({ type: USER_PASS_UPDATED_ERROR });
  }
}

function* deleteUser(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_USER}/api/user/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: USER_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error);
  }
}

export default function* sUserSaga() {
  yield takeEvery(GET_USER_BY_ID, fetchUserById);
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(ADD_USER, addUser);
  yield takeEvery(ADD_SURVEY, addSurvey);
  yield takeEvery(UPDATE_USER, updateUser);
  yield takeEvery(UPDATE_PASS, updatePass);
  yield takeEvery(DELETE_USER, deleteUser);
}
