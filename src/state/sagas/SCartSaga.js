import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_CARTS,
  ADD_CART,
  CARTS_RECEIVED,
  CART_ADDED,
  DELETE_CART,
  CART_DELETED,
  UPDATE_CART,
  CART_UPDATED,
  UPDATE_CARTADD,
  CARTADD_UPDATED
} from "../actions/types";

import mongoose from "mongoose";

function* fetchCarts(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_USER_USER}/api/cart/user/${idUser}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: CARTS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addCart(params) {
  const state = yield select();
  try {
    const response = yield call(
      () =>
        axios.post(
          `${process.env.REACT_APP_BACKEND_USER_CART}/api/cart/`,
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
        `${process.env.REACT_APP_BACKEND_USER_CART}/api/cart/${params.newCart._id}`,
        params.newCategory,
        tokenConfig(state)
      )
    );

    yield put({ type: CART_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deleteCarts(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_USER_CART}/api/cart/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: CART_DELETED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateCartAdd(params) {
  try {
    const { arrVariants } = params.params
    console.log('sagaArrVariants: ', arrVariants);
    yield put({ type: CARTADD_UPDATED, payload: arrVariants });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sCartSaga() {
  yield takeEvery(GET_CARTS, fetchCarts);
  yield takeEvery(ADD_CART, addCart);
  yield takeEvery(UPDATE_CART, updateCart);
  yield takeEvery(DELETE_CART, deleteCarts);
  yield takeEvery(UPDATE_CARTADD, updateCartAdd);
}
