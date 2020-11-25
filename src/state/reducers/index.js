import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer';
import movieReducer from './movieReducer';
import productCateReducer from './productCateReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import authUserReducer from './authUserReducer';
import historyReducer from './historyReducer';
import roleReducer from './roleReducer';
import productReducer from './productReducer';
import shopReducer from './shopReducer';
import productaddReducer from './productaddReducer';
import productVarReducer from './productVarReducer';
import employeeRoleReducer from './employeeRoleReducer';
import variantValReducer from './variantValReducer';
import movieCateReducer from './movieCateReducer';
import modalReducer from './modalReducer';

import memberReducer from './memberReducer';
import invoiceReducer from './invoiceReducer';
import payslipReducer from './payslipReducer';
import materialReducer from './materialReducer';
import notificationReducer from './notificationReducer';
import supplierReducer from './supplierReducer';
import storageReportReducer from './storageReportReducer';
import invoicedetReducer from './invoicedetReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  employee: employeeReducer,
  emprole: employeeRoleReducer,
  error: errorReducer,
  auth: authReducer,
  authUser: authUserReducer,
  history: historyReducer,
  role: roleReducer,
  member: memberReducer,
  product: productReducer,
  variantVal: variantValReducer,
  shop: shopReducer,
  movie: movieReducer,
  productCate: productCateReducer,
  movieCate: movieCateReducer,
  cart: cartReducer,
  modal: modalReducer,
  productVar: productVarReducer,

  invoice: invoiceReducer,
  invoicedet: invoicedetReducer,
  payslip: payslipReducer,
  material: materialReducer,
  showNoti: notificationReducer,
  supplier: supplierReducer,
  storagereport: storageReportReducer,
  productadd: productaddReducer,
});
