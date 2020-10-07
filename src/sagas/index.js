import { all, call } from "redux-saga/effects";
import sEmployeeSaga from "./SEmployeeSaga";
import sAuthSaga from "./SAuthSaga";
import sHistorySaga from "./HistorySaga";
import sErrorSaga from "./SErrorSaga";
import sProductSaga from "./SProductSaga";
import sRoleSaga from "./SRoleSaga";
import sInvoiceSaga from "./SInvoiceSaga";

export default function* rootSaga() {
  yield all([
    sEmployeeSaga(),
    sAuthSaga(),
    sHistorySaga(),
    sErrorSaga(),
    sProductSaga(),
    sRoleSaga(),
    sInvoiceSaga(),
  ]);
}

export function* callAndCache(...args) {
  try {
    yield call(...args);
  } catch (error) {
    throw error;
  }
}
