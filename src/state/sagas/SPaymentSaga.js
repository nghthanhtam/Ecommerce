import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { GET_PAYMENTS, PAYMENTS_RECEIVED } from "../actions/types";

function* fetchPayments(params) {
  try {
    const state = yield select(),
      { limit, page } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/paymentMethod?limit=${limit}&page=${page}`,
        tokenConfig(state)
      )
    );

    yield put({ type: PAYMENTS_RECEIVED, payload: response });
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

export default function* sPaymentSaga() {
  yield takeEvery(GET_PAYMENTS, fetchPayments);
}
