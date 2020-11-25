import { Redirect } from 'react-router-dom';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { tokenConfig } from '../../state/actions/authActions';
import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  EMPLOYEES_RECEIVED,
  EMPLOYEE_ADDED,
  DELETE_EMPLOYEE,
  EMPLOYEE_DELETED,
  UPDATE_EMPLOYEE,
  EMPLOYEE_UPDATED,
} from '../actions/types';

import mongoose from 'mongoose';

function* fetchEmployees(params) {
  try {
    const state = yield select(),
      { limit, page, query, idShop, deletedEmp, activeEmp } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/employee/shop/${idShop}?limit=${limit}&page=${page}&query=${query}&deletedEmp=${deletedEmp}&activeEmp=${activeEmp}`,
          tokenConfig(state)
        )
    );

    // const response = yield call(getEmployeesAPI, {
    //   params: params.pages,
    //   state: state,
    // });
    yield put({ type: EMPLOYEES_RECEIVED, payload: response });
  } catch (error) {
    console.log({ ...error });
    let err = { ...error }
    if (err.status == 401) {
      this.props.history.push({
        pathname: '/login',
      });
    }
  }
}

function* addEmployee(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/employee/`,
        params.newEmp,
        tokenConfig(state)
      )
    );
    if (response.data._id instanceof mongoose.Types.ObjectId) {
      response.data._id = response.data._id.toString();
    }

    yield put({ type: EMPLOYEE_ADDED, payload: response.data });
    yield put({
      type: GET_EMPLOYEES,
      pages: params.newEmp.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateEmployee(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/employee/${params.newEmp.id}`,
        params.newEmp,
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
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_EMPLOYEE}/api/employee/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: EMPLOYEE_DELETED, payload: { id: params.id } });
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
