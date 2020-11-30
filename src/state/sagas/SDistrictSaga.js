import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { tokenConfig } from '../actions/authActions';
import {
  GET_DISTRICTS,
  DISTRICTS_RECEIVED,
} from '../actions/types';

function* fetchDistricts(params) {
  try {
    const state = yield select(),
      { limit, page, idCity } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_USER}/api/district/city/${idCity}?limit=${limit}&page=${page}`,
          tokenConfig(state)
        )
    );

    yield put({ type: DISTRICTS_RECEIVED, payload: response });
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

export default function* sDistrictSaga() {
  yield takeEvery(GET_DISTRICTS, fetchDistricts);
}
