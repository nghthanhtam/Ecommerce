import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { tokenAdminConfig } from "../actions/authAdminActions";
import { GET_PERMISSIONS, PERMISSIONS_RECEIVED } from "../actions/types";

function* fetchPermissions(params) {
  try {
    const state = yield select(),
      { limit, page, query, type } = params.pages;

    const response = yield call(() =>
      type == "seller"
        ? axios.get(
            `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/permission?limit=${limit}&page=${page}&query=${query}`,
            tokenConfig(state)
          )
        : axios.get(
            `${process.env.REACT_APP_BACKEND_ADMIN}/api/permission?limit=${limit}&page=${page}&query=${query}`,
            tokenAdminConfig(state)
          )
    );
    yield put({ type: PERMISSIONS_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
  }
}

export default function* sPermissionSaga() {
  yield takeEvery(GET_PERMISSIONS, fetchPermissions);
}
