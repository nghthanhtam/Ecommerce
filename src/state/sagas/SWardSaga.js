import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { GET_WARDS, WARDS_RECEIVED } from "../actions/types";

function* fetchWards(params) {
  try {
    const state = yield select(),
      { limit, page, idDistrict } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_USER}/api/ward/district/${idDistrict}?limit=${limit}&page=${page}`,
        tokenConfig(state)
      )
    );

    yield put({ type: WARDS_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
    let err = { ...error };
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/login",
      });
    }
  }
}

export default function* sWardSaga() {
  yield takeEvery(GET_WARDS, fetchWards);
}
