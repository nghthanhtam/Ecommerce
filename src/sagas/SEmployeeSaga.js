import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  CATEGORIES_RECEIVED,
  CATEGORIES_ADDED,
  CATEGORIES_ADDED_FAILED,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../actions/types";
// import { getCategoriesAPI, addCategoriesAPI } from "../apis/admin/employee";
import mongoose from "mongoose";

function* fetchCategories(params) {
  try {
    if (params.pages.query === "") params.pages.query = "undefined";
    const state = yield select();

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_HOST}/api/category/${params.pages.show}/${params.pages.page}/${params.pages.query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    // const response = yield call(getCategoriesAPI, {
    //   params: params.pages,
    //   state: state,
    // });
    yield put({ type: CATEGORIES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addCategories(params) {
  const state = yield select();
  console.log(params);
  try {
    const response = yield call(
      () =>
        axios.post(
          `${process.env.REACT_APP_BACKEND_HOST}/api/category/`,
          params.newCategory,
          tokenConfig(state)
        )
      // .then((res) => {
      //   console.log(res);

      // })
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: CATEGORIES_ADDED, payload: response.data });
  } catch (error) {
    yield put({ type: CATEGORIES_ADDED_FAILED, error });
  }
}

export default function* sEmployeeSaga() {
  yield takeEvery(GET_CATEGORIES, fetchCategories);
  yield takeEvery(ADD_CATEGORY, addCategories);
}
