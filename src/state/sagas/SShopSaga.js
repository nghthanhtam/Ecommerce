import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../../state/actions/authActions";
import { tokenAdminConfig } from "../../state/actions/authAdminActions";
import {
  GET_SHOPS,
  ADD_SHOP,
  SHOPS_RECEIVED,
  SHOP_RECEIVED,
  SHOP_ADDED,
  DELETE_SHOP,
  SHOP_DELETED,
  UPDATE_SHOP,
  SHOP_UPDATED,
  GET_SHOP_BY_ID,
  SHOW_MODAL,
  ADMIN_LOGOUT,
  SHOW_NOTI,
} from "../actions/types";
import { ADD_NOTIFICATION } from "react-redux-notify";
import { NOTI_SUCCESS } from "./NotificationObject";

function* fetchShops(params) {
  try {
    const state = yield select(),
      { limit, page, query, arrayStatus } = params.pages;
    let tempString = "";
    for (let x = 0; x < arrayStatus.length; x++) {
      tempString += `&arrayStatus[]=${arrayStatus[x]}`;
    }

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/shop?limit=${limit}&page=${page}&query=${query}` +
          tempString,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: SHOPS_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
    let err = { ...error };
    if (err.response.status == 401) {
      yield put({
        type: SHOW_MODAL,
        payload: { show: true, modalName: "modalExpire" },
      });
      yield delay(2000);
      yield put({
        type: SHOW_MODAL,
        payload: { show: false },
      });
      yield put({ type: ADMIN_LOGOUT });
    }
  }
}

function* fetchShopById(params) {
  try {
    const state = yield select(),
      { id } = params;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/shop/${id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: SHOP_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
    let err = { ...error };
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/admin/login",
      });
    }
  }
}

function* addShop(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/shop/`,
        params.newShop,
        tokenConfig(state)
      )
    );

    yield put({ type: SHOP_ADDED, payload: response.data });
    yield put({
      type: GET_SHOPS,
      pages: params.newShop.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateShop(params) {
  const state = yield select(),
    { newShop, type } = params.params;
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/shop/${newShop.id}`,
        newShop,
        type == "seller" ? tokenConfig(state) : tokenAdminConfig(state)
      )
    );

    yield put({ type: SHOP_UPDATED, payload: response.data });
    yield put({ type: SHOW_NOTI });
    yield put({
      type: ADD_NOTIFICATION,
      notification: NOTI_SUCCESS,
    });
  } catch (error) {
    console.log(error);
  }
}

function* deleteShop(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/shop/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: SHOP_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sShopSaga() {
  yield takeEvery(GET_SHOPS, fetchShops);
  yield takeEvery(GET_SHOP_BY_ID, fetchShopById);
  yield takeEvery(ADD_SHOP, addShop);
  yield takeEvery(UPDATE_SHOP, updateShop);
  yield takeEvery(DELETE_SHOP, deleteShop);
}
