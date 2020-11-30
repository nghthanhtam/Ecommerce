import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_CARTS_BY_IDUSER,
  ADD_CART,
  CARTS_RECEIVED,
  CART_ADDED,
  DELETE_CART,
  CART_DELETED,
  UPDATE_CART,
  CART_UPDATED,
} from "../actions/types";

import mongoose from "mongoose";

function* fetchCartsByIdUser(params) {
  try {
    const state = yield select(),
      { limit, page, idUser } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_USER}/api/cart/user/${idUser}?limit=${limit}&page=${page}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    //get total
    let total = 0
    response.data.map(cart => {
      cart.productVars.map(item => {
        total += Number(item.price) * item.amount
      })
    })

    //get totalCount
    let totalCount = 0
    response.data.map(cart => {
      cart.productVars.map(item => {
        totalCount += 1
      })
    })

    yield put({ type: CARTS_RECEIVED, payload: { items: response.data, total, totalCount } });
  } catch (error) {
    console.log({ ...error });
  }
}

function* addCart(params) {
  const state = yield select();
  try {
    const response = yield call(
      () =>
        axios.post(
          `${process.env.REACT_APP_BACKEND_USER}/api/cart/`,
          params.newCart,
          tokenConfig(state)
        )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: CART_ADDED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateCart(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_USER}/api/cart/${params.newCart.id}`,
        params.newCart,
        tokenConfig(state)
      )
    );
    console.log(response.data);
    yield put({ type: CART_UPDATED, payload: response.data });
    yield put({ type: GET_CARTS_BY_IDUSER, pages: { limit: 10000, page: 1, idUser: params.newCart.idUser } })

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
        tokenConfig(state)
      )
    );

    yield put({ type: CART_DELETED, payload: response.data });
    yield put({
      type: GET_CARTS_BY_IDUSER, pages: { limit: 10000, page: 1, idUser: params.params.idUser },
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
