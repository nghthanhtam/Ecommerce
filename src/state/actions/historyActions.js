import { PUSH_HISTORY, LOAD_HISTORY } from "./types";

// export const loadHistory = (history) => (dispatch) => {
//   dispatch({
//     type: GET_HISTORY,
//     payload: history,
//   });
// };

export const loadHistory = (history) => ({
  type: LOAD_HISTORY,
  history: history,
});

export const pushHistory = (path) => ({
  type: PUSH_HISTORY,
  path: path,
});

// export const pushHistory = (path) => (dispatch, getState) => {
//   const currentHistory = getState().history.history;

//   currentHistory.push(path);

//   dispatch({
//     type: GET_HISTORY,
//     payload: currentHistory,
//   });
// };
