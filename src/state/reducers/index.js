import { combineReducers } from "redux";
import notifyReducer from "react-redux-notify";
import employeeReducer from "./employeeReducer";
import movieReducer from "./movieReducer";
import productCateReducer from "./productCateReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import authUserReducer from "./authUserReducer";
import historyReducer from "./historyReducer";
import roleReducer from "./roleReducer";
import productReducer from "./productReducer";
import shopReducer from "./shopReducer";
import productVarReducer from "./productVarReducer";
import variantValReducer from "./variantValReducer";
import movieCateReducer from "./movieCateReducer";
import modalReducer from "./modalReducer";
import addressReducer from "./addressReducer";
import paymentReducer from "./paymentReducer";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";
import ratingReducer from "./ratingReducer";
import commentReducer from "./commentReducer";
import answerReducer from "./answerReducer";
import stockHisReducer from "./stockHistoryReducer";
import cartReducer from "./cartReducer";
import cityReducer from "./cityReducer";
import districtReducer from "./districtReducer";
import wardReducer from "./wardReducer";
import authAdminReducer from "./authAdminReducer";
import questionReducer from "./questionReducer";
import payslipReducer from "./payslipReducer";
import promotionReducer from "./promotionReducer";
import promotionTypeReducer from "./promotionTypeReducer";
import laterListReducer from "./laterListReducer ";
import permissionReducer from "./permissionReducer";
import purchaseReducer from "./purchaseReducer";
import roleAdminReducer from "./roleAdminReducer";
import adminReducer from "./adminReducer";
import notiReducer from "./notiReducer";
import logAdminReducer from "./logAdminReducer";
import logSellerReducer from "./logSellerReducer";

export default combineReducers({
  notifications: notifyReducer,
  noti: notiReducer,
  employee: employeeReducer,
  error: errorReducer,
  auth: authReducer,
  authUser: authUserReducer,
  history: historyReducer,
  role: roleReducer,
  product: productReducer,
  variantVal: variantValReducer,
  shop: shopReducer,
  movie: movieReducer,
  productCate: productCateReducer,
  movieCate: movieCateReducer,
  cart: cartReducer,
  modal: modalReducer,
  productVar: productVarReducer,
  address: addressReducer,
  payment: paymentReducer,
  order: orderReducer,
  city: cityReducer,
  district: districtReducer,
  ward: wardReducer,
  user: userReducer,
  rating: ratingReducer,
  authAdmin: authAdminReducer,
  comment: commentReducer,
  question: questionReducer,
  answer: answerReducer,
  stockHis: stockHisReducer,
  payslip: payslipReducer,
  promotion: promotionReducer,
  promotionType: promotionTypeReducer,
  laterList: laterListReducer,
  permission: permissionReducer,
  purchase: purchaseReducer,
  roleAdmin: roleAdminReducer,
  admin: adminReducer,
  logAdmin: logAdminReducer,
  logSeller: logSellerReducer,
});
