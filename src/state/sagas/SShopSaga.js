import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { tokenConfig } from '../actions/authActions';
import {
  GET_SHOPS,
  ADD_SHOP,
  SHOPS_RECEIVED,
  SHOP_ADDED,
  DELETE_SHOP,
  SHOP_DELETED,
  UPDATE_SHOP,
  SHOP_UPDATED,
} from '../actions/types';

import mongoose from 'mongoose';

function* fetchShops(params) {
  try {
    console.log(params);
    if (params.pages.query === '') params.pages.query = 'undefined';
    const state = yield select();

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_HOST}/api/shop/${params.pages.select}/${params.pages.currentPage}/${params.pages.query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    // const response = yield call(getShopsAPI, {
    //   params: params.pages,
    //   state: state,
    // });
    yield put({ type: SHOPS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addShop(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/shop/`,
        params.newShop,
        tokenConfig(state)
      )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: SHOP_ADDED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateShop(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_HOST}/api/category/${params.newCategory._id}`,
        params.newCategory,
        tokenConfig(state)
      )
    );

    yield put({ type: SHOP_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deleteShop(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}/api/category/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: SHOP_DELETED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sShopSaga() {
  yield takeEvery(GET_SHOPS, fetchShops);
  yield takeEvery(ADD_SHOP, addShop);
  yield takeEvery(UPDATE_SHOP, updateShop);
  yield takeEvery(DELETE_SHOP, deleteShop);
}
