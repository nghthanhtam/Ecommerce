import { takeEvery, put, select } from "redux-saga/effects";
import { LOAD_HISTORY, PUSH_HISTORY, GET_HISTORY } from "../actions/types";

function* loadHistory(params) {
  try {
    yield put({ type: GET_HISTORY, payload: params.history });
  } catch (error) {
    yield put({ error });
  }
}

// export const pushHistory = (path) => (dispatch, getState) => {
//   const currentHistory = getState().history.history;

//   currentHistory.push(path);

//   dispatch({
//     type: GET_HISTORY,
//     payload: currentHistory,
//   });
// };

function* pushHistory(params) {
  const state = yield select(),
    currentHistory = state.history.history;
  console.log(state);
  currentHistory.push(params.path);
  try {
    yield put({ type: GET_HISTORY, payload: currentHistory });
  } catch (error) {
    yield put({ error });
  }
}

export default function* sHistorySaga() {
  yield takeEvery(LOAD_HISTORY, loadHistory);
  yield takeEvery(PUSH_HISTORY, pushHistory);
}
