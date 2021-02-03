import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../../state/actions/authActions";
import { tokenUserConfig } from "../../state/actions/authUserActions";
import { tokenAdminConfig } from "../../state/actions/authAdminActions";
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
  UPDATE_SHIPPINGFEE,
  GET_ORDERS,
  DELETE_PROMOTIONINFOR,
  GET_ORDERS_BY_PURCHASE,
  ORDERS_BY_PURCHASE_RECEIVED,
} from "../actions/types";

function* fetchOrders(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;
    console.log(params);
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order?limit=${limit}&page=${page}&query=${query}`,
        tokenAdminConfig(state)
      )
    );
    yield put({ type: ORDERS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/admin/login",
      });
    }
  }
}

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

    let total = 0;
    if (response) {
      response.data.ProductVars.map((oDet) => {
        total += oDet.price * oDet.quantity - oDet.discountAmount;
      });
    }

    yield put({
      type: ORDER_DETS_RECEIVED,
      payload: { item: response, total },
    });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/login",
      });
    }
  }
}

function* fetchOrdersByShop(params) {
  try {
    const state = yield select(),
      { limit, page, idShop, done } = params.pages;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order/shop/${idShop}?limit=${limit}&page=${page}&done=${done}`,
        tokenConfig(state)
      )
    );

    yield put({ type: ORDERS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/login",
      });
    }
  }
}

function* fetchOrdersByPurchase(params) {
  try {
    const state = yield select(),
      { limit, page, id } = params.pages;
    const response = yield call(() =>
      axios.get(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order/purchase/${id}?limit=${limit}&page=${page}`,
        tokenAdminConfig(state)
      )
    );

    yield put({
      type: ORDERS_BY_PURCHASE_RECEIVED,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    let err = { ...error };
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/admin/login",
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
    if (err.response.status == 401) {
      this.props.history.push({
        pathname: "/shopnow",
      });
    }
  }
}

function* addOrder(params) {
  const state = yield select();
  const { newOrder } = params;
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
    console.log(error);
  }
}

function* updateOrder(params) {
  const state = yield select();
  console.log(params);
  const { id, status, cancelReason, type, idUser } = params.newOrder;
  let pages, idShop, idPurchase;
  if (params.newOrder.idShop) idShop = params.newOrder.idShop;
  if (params.newOrder.pages) pages = params.newOrder.pages;
  if (params.newOrder.idPurchase) idPurchase = params.newOrder.idPurchase;

  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order/${id}/status`,
        { status, cancelReason },
        type == "user"
          ? tokenUserConfig(state)
          : type == "admin"
          ? tokenAdminConfig(state)
          : tokenConfig(state)
      )
    );
    type == "user"
      ? yield put({
          type: GET_USER_ORDERS,
          pages: { limit: 1000, page: 1, idUser },
        })
      : type == "admin"
      ? yield put({
          type: GET_ORDERS_BY_PURCHASE,
          pages: { id: idPurchase, limit: 1000, pages: 1 },
        })
      : yield put({
          type: GET_ORDERS_BY_SHOP,
          pages: { ...pages, done: false, idShop },
        });
    yield put({ type: ORDER_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* updateShippingFee(params) {
  const state = yield select();
  const { type, pages, id } = params.newOrder;
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order/${id}/shippingInfo`,
        params.newOrder,
        type == "admin" ? tokenAdminConfig(state) : tokenConfig(state)
      )
    );

    yield put({ type: ORDER_UPDATED, payload: response.data });
    type == "admin"
      ? yield put({
          type: GET_ORDERS,
          pages: { page: 1, limit: 1000, query: "" },
        })
      : yield put({
          type: GET_ORDERS_BY_SHOP,
          pages: { ...pages, done: false },
        });
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
    console.log(error);
  }
}

function* deletePromotionInfor(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_ORDER}/api/order/${params.id}/deletePromotionInfo`,
        { idOrder: params.id },
        tokenAdminConfig(state)
      )
    );
  } catch (error) {
    console.log(error);
  }
}

export default function* sOrderSaga() {
  yield takeEvery(GET_ORDERS_BY_PURCHASE, fetchOrdersByPurchase);
  yield takeEvery(DELETE_PROMOTIONINFOR, deletePromotionInfor);
  yield takeEvery(GET_ORDERDETS_BY_ORDERID, fetchOrderDetsByOrderId);
  yield takeEvery(GET_ORDERS_BY_SHOP, fetchOrdersByShop);
  yield takeEvery(GET_ORDERS, fetchOrders);
  yield takeEvery(GET_USER_ORDERS, fetchUserOrders);
  yield takeEvery(ADD_ORDER, addOrder);
  yield takeEvery(UPDATE_ORDER, updateOrder);
  yield takeEvery(UPDATE_SHIPPINGFEE, updateShippingFee);
  yield takeEvery(DELETE_ORDER, deleteOrder);
}
