import { takeEvery, put, call, select } from "redux-saga/effects";
import axios from "axios";
import { tokenConfig } from "../actions/authActions";
import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  EMPLOYEES_RECEIVED,
  EMPLOYEES_ADDED,
  DELETE_EMPLOYEE,
  EMPLOYEE_DELETED,
  UPDATE_EMPLOYEE,
  EMPLOYEE_UPDATED,
} from "../actions/types";

import mongoose from "mongoose";

function* fetchEmployees(params) {
  try {
    console.log(params);
    if (params.pages.query === "") params.pages.query = "undefined";
    const state = yield select();

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_HOST}/api/category/${params.pages.select}/${params.pages.currentPage}/${params.pages.query}`,
          tokenConfig(state)
        )
        .catch((er) => console.log(er.response))
    );

    // const response = yield call(getEmployeesAPI, {
    //   params: params.pages,
    //   state: state,
    // });
    yield put({ type: EMPLOYEES_RECEIVED, payload: response });
  } catch (error) {
    console.log(error);
  }
}

function* addEmployee(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/api/category/`,
        params.newCategory,
        tokenConfig(state)
      )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: EMPLOYEES_ADDED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateEmployee(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_HOST}/api/category/${params.newCategory._id}`,
        params.newCategory,
        tokenConfig(state)
      )
    );

    yield put({ type: EMPLOYEE_UPDATED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}
function* deleteEmployees(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_HOST}/api/category/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: EMPLOYEE_DELETED, payload: response.data });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sEmployeeSaga() {
  yield takeEvery(GET_EMPLOYEES, fetchEmployees);
  yield takeEvery(ADD_EMPLOYEE, addEmployee);
  yield takeEvery(UPDATE_EMPLOYEE, updateEmployee);
  yield takeEvery(DELETE_EMPLOYEE, deleteEmployees);
}
