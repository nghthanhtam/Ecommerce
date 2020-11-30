import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { tokenConfig } from '../actions/authActions';
import {
  GET_ADDRESSES,
  ADD_ADDRESS,
  ADDRESSES_RECEIVED,
  ADDRESS_ADDED,
  DELETE_ADDRESS,
  ADDRESS_DELETED,
  UPDATE_ADDRESS,
  ADDRESS_UPDATED,
} from '../actions/types';

function* fetchAddresses(params) {
  try {
    const state = yield select(),
      { limit, page, idUser } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_USER}/api/address/user/${idUser}?limit=${limit}&page=${page}`,
          tokenConfig(state)
        )
    );
    console.log(response);
    yield put({ type: ADDRESSES_RECEIVED, payload: response });
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

function* addAddress(params) {
  const state = yield select();

  try {
    const response = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_BACKEND_USER}/api/address/`,
        params.newAddress,
        tokenConfig(state)
      )
    );

    yield put({ type: ADDRESS_ADDED, payload: response.data });
    yield put({
      type: GET_ADDRESSES,
      pages: params.newAddress.pages,
    });
  } catch (error) {
    console.log(error.response);
  }
}

function* updateAddress(params) {
  const state = yield select();
  try {
    const response = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_BACKEND_USER}/api/address/${params.newAddress.id}`,
        params.newAddress,
        tokenConfig(state)
      )
    );

    yield put({ type: ADDRESS_UPDATED, payload: response.data });
    yield put({ type: GET_ADDRESSES, pages: { limit: 1000, page: 1, idUser: params.newAddress.idUser } });
  } catch (error) {
    console.log(error.response);
  }
}

function* deleteAddress(params) {
  const state = yield select();
  try {
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_BACKEND_USER}/api/address/${params.id}`,
        tokenConfig(state)
      )
    );

    yield put({ type: ADDRESS_DELETED, payload: { id: params.id } });
  } catch (error) {
    console.log(error.response);
  }
}

export default function* sAddressSaga() {
  yield takeEvery(GET_ADDRESSES, fetchAddresses);
  yield takeEvery(ADD_ADDRESS, addAddress);
  yield takeEvery(UPDATE_ADDRESS, updateAddress);
  yield takeEvery(DELETE_ADDRESS, deleteAddress);
}
