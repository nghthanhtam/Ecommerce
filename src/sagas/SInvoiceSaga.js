import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_INVOICES,
  GET_ALL_INVOICES,
  ADD_INVOICE,
  INVOICES_RECEIVED,
  INVOICES_ADDED,
  DELETE_INVOICE,
  INVOICE_DELETED,
  UPDATE_INVOICE,
  INVOICE_UPDATED,
} from "../actions/types";

import mongoose from "mongoose";

function* fetchInvoices(params) {
  try {
    if (params.pages.query === "") params.pages.query = "undefined";
    const state = yield select();

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_HOST}/api/invoice/${params.pages.select}/${params.pages.currentPage}/${params.pages.query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: INVOICES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* fetchAllInvoices(params) {
  try {
    if (params.query === "") params.query = "undefined";
    const state = yield select();

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_HOST}/api/invoice/${undefined}/${undefined}/${params.query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );
    console.log(response);
    yield put({ type: INVOICES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addInvoices(params) {
  const state = yield select();
  console.log(params);
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/invoice/`,
        params.newCategory,
        tokenConfig(state)
      )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: INVOICES_ADDED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateInvoice(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_HOST}/api/invoice/${params.newCategory._id}`,
        params.newCategory,
        tokenConfig(state)
      )
    );

    yield put({ type: INVOICE_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deleteInvoices(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}/api/invoice/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: INVOICE_DELETED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sInvoiceSaga() {
  yield takeEvery(GET_INVOICES, fetchInvoices);
  yield takeEvery(ADD_INVOICE, addInvoices);
  yield takeEvery(UPDATE_INVOICE, updateInvoice);
  yield takeEvery(DELETE_INVOICE, deleteInvoices);
  yield takeEvery(GET_ALL_INVOICES, fetchAllInvoices);
}
