import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import { tokenAdminConfig } from "../actions/authAdminActions";
import { tokenUserConfig } from "../actions/authUserActions";
import { noTokenConfig } from "../actions/authUserActions";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_IDSHOP,
  SORT_PRODUCTS,
  PRODUCTS_SORTED,
  ADD_PRODUCT,
  PRODUCT_RECEIVED,
  PRODUCTS_RECEIVED,
  PRODUCT_ADDED,
  DELETE_PRODUCT,
  PRODUCT_DELETED,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_STATUS,
  PRODUCT_UPDATED,
  GET_PRODUCTS_BY_FILTERS,
  REC_PRODUCTS_RECEIVED,
  GET_RECOMMENDED_PRODUCTS,
  GET_TRENDING_PRODUCTS,
  TRENDING_PRODUCTS_RECEIVED,
  GET_SURVEY_PRODUCTS,
  SURVEY_PRODUCTS_RECEIVED,
} from "../actions/types";

function* sortProducts(params) {
  try {
    const { sortField } = params;
    yield delay(1000);
    yield put({ type: PRODUCTS_SORTED, payload: sortField });
  } catch (error) {
    console.log(error);
  }
}

function* fetchProductById(params) {
  try {
    const state = yield select(),
      { idProduct, idShop } = params.params;
    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/${idProduct}/shop/${idShop}`,
          noTokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );
    console.log(response);
    yield put({ type: PRODUCT_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* fetchProductsByIdShop(params) {
  try {
    const state = yield select(),
      { limit, page, query, idShop, arrayStatus } = params.pages;
    let tempString = "";
    for (let x = 0; x < arrayStatus.length; x++) {
      tempString += `&arrayStatus[]=${arrayStatus[x]}`;
    }
    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/shop/${idShop}?limit=${limit}&page=${page}&query=${query}` +
            tempString,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: PRODUCTS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* fetchProducts(params) {
  try {
    const state = yield select(),
      { limit, page, query, arrayStatus } = params.pages;
    let tempString = "";
    for (let x = 0; x < arrayStatus.length; x++) {
      tempString += `&arrayStatus[]=${arrayStatus[x]}`;
    }

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product?limit=${limit}&page=${page}&query=${query}` +
            tempString,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: PRODUCTS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* getSurveyProducts(params) {
  console.log(params);
  const state = yield select();
  try {
    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/search/survey`,
          tokenUserConfig(state)
        )
        .catch((er) => console.log(er))
    );
    yield put({ type: SURVEY_PRODUCTS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* getTrendingProducts() {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/search/trending`,
          tokenUserConfig(state)
        )
        .catch((er) => console.log(er))
    );
    yield put({ type: TRENDING_PRODUCTS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* getRecProducts() {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/recommendation/system`,
          tokenUserConfig(state)
        )
        .catch((er) => console.log(er))
    );
    yield put({ type: REC_PRODUCTS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* fetchProductsByFilters(params) {
  try {
    const state = yield select(),
      { limit, page, arrayFilter } = params.pages;
    let filters = "";
    for (let x = 0; x < arrayFilter.length; x++) {
      filters += `&` + arrayFilter[x].name + `=${arrayFilter[x].value}`;
    }

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/search/filter?limit=${limit}&page=${page}` +
            filters,
          noTokenConfig
        )
        .catch((er) => console.log(er.response))
    );

    yield put({ type: PRODUCTS_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addProduct(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/`,
        params.newProduct,
        tokenConfig(state)
      )
    );

    yield put({ type: PRODUCT_ADDED, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* updateProduct(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/${params.newProduct.id}`,
        params.newProduct,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PRODUCT_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* deleteProducts(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/${params.id}`,
        tokenAdminConfig(state)
      )
    );

    yield put({ type: PRODUCT_DELETED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateProductStt(params) {
  const state = yield select(),
    { id, status, pages } = params.params;

  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_PRODUCT}/api/product/${id}/status`,
        { status },
        tokenAdminConfig(state)
      )
    );
    yield put({ type: PRODUCT_UPDATED, payload: response.data });
    yield put({
      type: GET_PRODUCTS,
      pages,
    });
  } catch (error) {
    console.log(error);
  }
}

export default function* sProductSaga() {
  yield takeEvery(SORT_PRODUCTS, sortProducts);
  yield takeEvery(GET_PRODUCT_BY_ID, fetchProductById);
  yield takeEvery(GET_PRODUCTS_BY_IDSHOP, fetchProductsByIdShop);
  yield takeEvery(GET_PRODUCTS, fetchProducts);
  yield takeEvery(GET_PRODUCTS_BY_FILTERS, fetchProductsByFilters);
  yield takeEvery(ADD_PRODUCT, addProduct);
  yield takeEvery(UPDATE_PRODUCT, updateProduct);
  yield takeEvery(UPDATE_PRODUCT_STATUS, updateProductStt);
  yield takeEvery(DELETE_PRODUCT, deleteProducts);
  yield takeEvery(GET_RECOMMENDED_PRODUCTS, getRecProducts);
  yield takeEvery(GET_TRENDING_PRODUCTS, getTrendingProducts);
  yield takeEvery(GET_SURVEY_PRODUCTS, getSurveyProducts);
}
