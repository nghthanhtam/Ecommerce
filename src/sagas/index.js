import { all, call } from 'redux-saga/effects';
import sEmployeeSaga from './SEmployeeSaga';
import sAuthSaga from './SAuthSaga';
import sHistorySaga from './HistorySaga';
import sErrorSaga from './SErrorSaga';
import sProductSaga from './SProductSaga';
import sRoleSaga from './SRoleSaga';
import sInvoiceSaga from './SInvoiceSaga';
import sShopSaga from './SShopSaga';

export default function* rootSaga() {
  yield all([
    sEmployeeSaga(),
    sAuthSaga(),
    sHistorySaga(),
    sErrorSaga(),
    sProductSaga(),
    sRoleSaga(),
    sInvoiceSaga(),
    sShopSaga(),
  ]);
}

export function* callAndCache(...args) {
  try {
    yield call(...args);
  } catch (error) {
    throw error;
  }
}
