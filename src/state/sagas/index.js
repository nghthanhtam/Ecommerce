import { all, call } from 'redux-saga/effects';
import sEmployeeSaga from './SEmployeeSaga';
import sEmpRoleSaga from './SEmployeeRoleSaga';
import sAuthSaga from './SAuthSaga';
import sHistorySaga from './HistorySaga';
import sErrorSaga from './SErrorSaga';
import sProductSaga from './SProductSaga';
import sProductVarSaga from './SProductVarSaga';
import sVariantValSaga from './SVariantValSaga';
import sProductCateSaga from './SProductCateSaga';
import sMovieSaga from './SMovieSaga';
import sMovieCateSaga from './SMovieCateSaga';
import sRoleSaga from './SRoleSaga';
import sShopSaga from './SShopSaga';
import sInvoiceSaga from './SInvoiceSaga';

export default function* rootSaga() {
  yield all([
    sEmployeeSaga(),
    sAuthSaga(),
    sHistorySaga(),
    sErrorSaga(),
    sProductSaga(),
    sProductVarSaga(),
    sVariantValSaga(),
    sProductCateSaga(),
    sMovieSaga(),
    sMovieCateSaga(),
    sRoleSaga(),
    sInvoiceSaga(),
    sShopSaga(),
    sEmpRoleSaga()
  ]);
}

export function* callAndCache(...args) {
  try {
    yield call(...args);
  } catch (error) {
    throw error;
  }
}
