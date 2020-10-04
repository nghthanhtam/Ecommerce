import axios from "axios";
import { takeEvery, put, call, select } from "redux-saga/effects";
import { tokenConfig } from "../../actions/authActions";

export function getCategoriesAPI(params) {
  let { show, page, query } = params;
  return axios.get(
    `${process.env.REACT_APP_BACKEND_HOST}/api/category/${show}/${page}/${query}`,
    tokenConfig(params.state)
  );
}

export function addCategoriesAPI(params) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_HOST}/api/category/${params.show}/${params.page}/${params.query}`,
    tokenConfig(params.state)
  );
}
