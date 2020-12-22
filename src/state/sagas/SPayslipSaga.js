import { takeEvery, put, call, select } from "redux-saga/effects";
import { tokenConfig } from "../actions/authActions";
import axios from "axios";
import {
  GET_PAYSLIPS,
  ADD_PAYSLIP,
  PAYSLIPS_RECEIVED,
  PAYSLIP_ADDED,
  DELETE_PAYSLIP,
  PAYSLIP_DELETED,
  UPDATE_PAYSLIP,
  PAYSLIP_UPDATED,
  GET_RATINGS_BY_PRODUCT,
} from "../actions/types";

function* fetchPayslips(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/payslip?limit=${limit}&page=${page}&query=${query}`,
        tokenConfig(state)
      )
    );

    yield put({ type: PAYSLIPS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.status == 401) {
      this.props.history.push({
        pathname: "/seller/login",
      });
    }
  }
}

function* addPayslip(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/payslip/`,
        params.newItem,
        tokenConfig(state)
      )
    );

    yield put({ type: PAYSLIP_ADDED, payload: response.data });
    yield put({
      type: GET_RATINGS_BY_PRODUCT,
      pages: { limit: 1000, page: 1, idProduct: params.newItem.idProduct },
    });
  } catch (error) {
    console.log({ ...error });
  }
}

function* updatePayslip(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/payslip/${params.newItem.id}`,
        params.newItem,
        tokenConfig(state)
      )
    );

    yield put({ type: PAYSLIP_UPDATED, payload: response.data });
  } catch (error) {
    console.log({ ...error });
  }
}

function* deletePayslip(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/payslip/${params.id}`,
        tokenConfig(state)
      )
    );
    yield put({ type: PAYSLIP_DELETED, payload: { id: params.id } });
  } catch (err) {
    console.log(err.response);
  }
}

export default function* sPayslipSaga() {
  yield takeEvery(GET_PAYSLIPS, fetchPayslips);
  yield takeEvery(ADD_PAYSLIP, addPayslip);
  yield takeEvery(UPDATE_PAYSLIP, updatePayslip);
  yield takeEvery(DELETE_PAYSLIP, deletePayslip);
}
