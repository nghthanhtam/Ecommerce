import { all, call } from 'redux-saga/effects';
import sEmployeeSaga from './SEmployeeSaga';
import sEmpRoleSaga from './SEmployeeRoleSaga';
import sAuthSaga from './SAuthSaga';
import sCartSaga from './SCartSaga';
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
import sAuthUserSaga from './SAuthUserSaga';
import sAddressSaga from './SAddressSaga';
import sPaymentSaga from './SPaymentSaga';
import sOrderSaga from './SOrderSaga';
import sCitySaga from './SCitySaga';
import sDistrictSaga from './SDistrictSaga';
import sWardSaga from './SWardSaga'
import sUserSaga from './SUserSaga'
import sRatingSaga from './SRatingSaga'
import sAdminSaga from './SAdminSaga'
import sCommentSaga from './SCommentSaga'
import sQuestionSaga from './SQuestionSaga'

export default function* rootSaga() {
  yield all([
    sEmployeeSaga(),
    sAuthSaga(),
    sAuthUserSaga(),
    sCartSaga(),
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
    sEmpRoleSaga(),
    sAddressSaga(),
    sPaymentSaga(),
    sOrderSaga(),
    sCitySaga(),
    sDistrictSaga(),
    sWardSaga(),
    sUserSaga(),
    sRatingSaga(),
    sAdminSaga(),
    sCommentSaga(),
    sQuestionSaga()
  ]);
}

export function* callAndCache(...args) {
  try {
    yield call(...args);
  } catch (error) {
    throw error;
  }
}
