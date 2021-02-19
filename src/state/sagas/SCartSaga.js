import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import axios from "axios";
import { tokenUserConfig } from "../actions/authUserActions";
import {
  GET_CARTS_BY_IDUSER,
  ADD_CART,
  CARTS_RECEIVED,
  CART_ADDED,
  DELETE_CART,
  CART_DELETED,
  UPDATE_CART,
  CART_UPDATED,
  GET_LATERLISTS,
} from "../actions/types";

function* fetchCartsByIdUser(params) {
  try {
    const state = yield select(),
      { limit, page, idUser } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_USER}/api/cart/user/${idUser}?limit=${limit}&page=${page}`,
          tokenUserConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    let total = 0,
      totalCount = 0;
    const res = response.data;
    if (res.shops) {
      //get total
      res.shops.map((cart) => {
        cart.productVars.map((item) => {
          total += Number(item.price) * item.amount;
        });
      });

      //get totalCount
      res.shops.map((cart) => {
        cart.productVars.map((item) => {
          totalCount += 1;
        });
      });
    }

    yield put({
      type: CARTS_RECEIVED,
      payload: {
        items: res.shops ? res.shops : [],
        promotions: res.promotions,
        total,
        totalCount,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

function* addCart(params) {
  const state = yield select(),
    { newItem } = params;
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_USER}/api/cart/`,
        newItem,
        tokenUserConfig(state)
      )
    );

    yield put({ type: CART_ADDED, payload: response.data });
    yield put({
      type: GET_CARTS_BY_IDUSER,
      pages: { limit: 10000, page: 1, idUser: params.newItem.idUser },
    });
    yield put({
      type: GET_LATERLISTS,
      pages: { limit: 10000, page: 1, idUser: newItem.idUser },
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateCart(params) {
  const state = yield select();
  console.log("adsfasdfaf");
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_USER}/api/cart/${params.newCart.id}`,
        params.newCart,
        tokenUserConfig(state)
      )
    );
    yield put({ type: CART_UPDATED, payload: response.data });
    yield put({
      type: GET_CARTS_BY_IDUSER,
      pages: { limit: 1000, page: 1, idUser: params.newCart.idUser },
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* deleteCarts(params) {
  console.log(params);
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_USER}/api/cart/${params.params.id}`,
        tokenUserConfig(state)
      )
    );

    yield put({ type: CART_DELETED, payload: response.data });
    yield put({
      type: GET_CARTS_BY_IDUSER,
      pages: { limit: 10000, page: 1, idUser: params.params.idUser },
    });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sCartSaga() {
  yield takeEvery(GET_CARTS_BY_IDUSER, fetchCartsByIdUser);
  yield takeEvery(ADD_CART, addCart);
  yield takeEvery(UPDATE_CART, updateCart);
  yield takeEvery(DELETE_CART, deleteCarts);
}
