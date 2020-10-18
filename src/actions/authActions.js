import { USER_LOADING, USER_LOGIN, USER_LOGOUT, UPDATE_AUTH } from './types';
//Check token and load user
// export const loadUser = () => (dispatch, getState) => {
//   //User loading
//   dispatch({ type: USER_LOADING });

//   axios
//     .get(
//       `${process.env.REACT_APP_BACKEND_HOST}/api/auth/user`,
//       tokenConfig(getState)
//     )
//     .then((res) =>
//       dispatch({
//         type: USER_LOADED,
//         payload: res.data,
//       })
//     )
//     .catch((er) => {
//       dispatch(returnErrors(er.response.data, er.response.status));
//       dispatch({
//         type: AUTH_ERROR,
//       });
//     });
// };
export const loadUser = () => ({
  type: USER_LOADING,
});

export const logout = () => ({
  type: USER_LOGOUT,
});

// export const login = (user) => (dispatch) => {
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // Request body
//   //   const body = JSON.stringify({ username, password });

//   axios
//     .post(`${process.env.REACT_APP_BACKEND_HOST}/api/auth`, user, config)
//     .then((response) => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: response.data,
//       });
//       dispatch({
//         type: CLEAR_ERRORS,
//       });
//     })
//     .catch((err) => {
//       dispatch(
//         returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
//       );
//       return {
//         type: LOGIN_FAIL,
//       };
//     });
// };
export const login = (user) => ({
  type: USER_LOGIN,
  user: user,
});

export const updateAuth = (token) => ({
  type: UPDATE_AUTH,
  token: token,
});
// export const login = (user)  => {
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   axios
//     .post(`${process.env.REACT_APP_BACKEND_HOST}/api/auth`, user, config)
//     .then((response) => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: response.data,
//       });
//       dispatch({
//         type: CLEAR_ERRORS,
//       });
//     })
//     .catch((err) => {
//       dispatch(
//         returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
//       );
//       return {
//         type: LOGIN_FAIL,
//       };
//     });
// };
export const tokenConfig = (getState) => {
  //Get token from local storage
  //const token = getState().auth.token;
  const token = getState.auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  //Header
  if (token) {
    //config.headers["x-auth-token"] = token;
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};
