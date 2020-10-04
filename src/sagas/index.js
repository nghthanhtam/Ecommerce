import { all, call } from "redux-saga/effects";
import sEmployeeSaga from "./SEmployeeSaga";
import sAuthSaga from "./SAuthSaga";
import sHistorySaga from "./HistorySaga";
import sErrorSaga from "./SErrorSaga";

export default function* rootSaga() {
  yield all([sEmployeeSaga(), sAuthSaga(), sHistorySaga(), sErrorSaga()]);
}

export function* callAndCache(...args) {
  try {
    yield call(...args);
  } catch (error) {
    throw error;
  }
}
