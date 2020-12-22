import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../../state/actions/authActions";
import { tokenUserConfig } from "../../state/actions/authUserActions";
import {
  GET_ORDERS_BY_SHOP,
  GET_ORDERDETS_BY_ORDERID,
  ADD_ORDER,
  ORDERS_RECEIVED,
  ORDER_ADDED,
  DELETE_ORDER,
  ORDER_DELETED,
  UPDATE_ORDER,
  ORDER_UPDATED,
  GET_USER_ORDERS,
  ORDER_DETS_RECEIVED,
} from "../actions/types";

function* fetchOrderDetsByOrderId(params) {
  try {
    const state = yield select(),
      { id } = params;

    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order/${id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: ORDER_DETS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.status == 401) {
      this.props.history.push({
        pathname: "/login",
      });
    }
  }
}

function* fetchOrdersByShop(params) {
  try {
    const state = yield select(),
      { limit, page, idShop } = params.pages;
    console.log(params.pages);
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order/shop/${idShop}?limit=${limit}&page=${page}`,
        tokenConfig(state)
      )
    );

    yield put({ type: ORDERS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.status == 401) {
      this.props.history.push({
        pathname: "/login",
      });
    }
  }
}

function* fetchUserOrders(params) {
  try {
    const state = yield select(),
      { limit, page, idUser } = params.pages;
    console.log(params);
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order/user/${idUser}?limit=${limit}&page=${page}`,
        tokenUserConfig(state)
      )
    );

    yield put({ type: ORDERS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.status == 401) {
      this.props.history.push({
        pathname: "/shopnow",
      });
    }
  }
}

function* addOrder(params) {
  const state = yield select();
  const { newOrder } = params;
  console.log(params);
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order/`,
        newOrder,
        tokenUserConfig(state)
      )
    );
    console.log("orderAdded: ", response);
    yield put({ type: ORDER_ADDED, payload: response });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateOrder(params) {
  const state = yield select();
  const { id, status, cancelReason, type, idUser } = params.newOrder;
  let pages;
  if (params.newOrder.pages) pages = params.newOrder.pages;

  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order/${id}/status`,
        { status, cancelReason },
        type == "user" ? tokenUserConfig(state) : tokenConfig(state)
      )
    );
    type == "user"
      ? yield put({
          type: GET_USER_ORDERS,
          pages: { limit: 1000, page: 1, idUser },
        })
      : yield put({
          type: GET_ORDERS_BY_SHOP,
          pages,
        });
    yield put({ type: ORDER_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* deleteOrder(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: ORDER_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sOrderSaga() {
  yield takeEvery(GET_ORDERDETS_BY_ORDERID, fetchOrderDetsByOrderId);
  yield takeEvery(GET_ORDERS_BY_SHOP, fetchOrdersByShop);
  yield takeEvery(GET_USER_ORDERS, fetchUserOrders);
  yield takeEvery(ADD_ORDER, addOrder);
  yield takeEvery(UPDATE_ORDER, updateOrder);
  yield takeEvery(DELETE_ORDER, deleteOrder);
}
