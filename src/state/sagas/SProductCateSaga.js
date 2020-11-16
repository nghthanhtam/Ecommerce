import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { tokenConfig } from '../actions/authActions';
import {
  GET_PRODUCT_CATES,
  ADD_PRODUCT_CATE,
  PRODUCT_CATES_RECEIVED,
  PRODUCT_CATE_ADDED,
  DELETE_PRODUCT_CATE,
  PRODUCT_CATE_DELETED,
  UPDATE_PRODUCT_CATE,
  PRODUCT_CATE_UPDATED,
} from '../actions/types';

import mongoose from 'mongoose';

function* fetchProductCates(params) {
  try {
    const state = yield select(),
      { limit, page, query } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productcat?limit=${limit}&page=${page}&query=${query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: PRODUCT_CATES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addProductCate(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productcat/`,
        params.newProductCate,
        tokenConfig(state)
      )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: PRODUCT_CATE_ADDED, payload: response.data });
    yield put({
      type: GET_PRODUCT_CATES,
      pages: params.newProductCate.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateProductCate(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productcat/${params.newProductCate.id}`,
        params.newProductCate,
        tokenConfig(state)
      )
    );

    yield put({ type: PRODUCT_CATE_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deleteProductCates(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/productcat/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: PRODUCT_CATE_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sProductCateSaga() {
  yield takeEvery(GET_PRODUCT_CATES, fetchProductCates);
  yield takeEvery(ADD_PRODUCT_CATE, addProductCate);
  yield takeEvery(UPDATE_PRODUCT_CATE, updateProductCate);
  yield takeEvery(DELETE_PRODUCT_CATE, deleteProductCates);
}
