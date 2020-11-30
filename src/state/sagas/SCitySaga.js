import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { tokenConfig } from '../actions/authActions';
import {
  GET_CITIES,
  CITIES_RECEIVED,
} from '../actions/types';

function* fetchCities(params) {
  try {
    const state = yield select(),
      { limit, page } = params.pages;

    const response = yield call(() =>
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_USER}/api/city?limit=${limit}&page=${page}`,
          tokenConfig(state)
        )
    );

    yield put({ type: CITIES_RECEIVED, payload: response });
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

export default function* sCitySaga() {
  yield takeEvery(GET_CITIES, fetchCities);
}
