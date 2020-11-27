import {
  USER_LOADED,
  USER_LOADING,
  USER_AUTH_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_AUTH_SUCCESS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('usertoken'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        isLoaded: true,
      };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      localStorage.setItem('usertoken', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isLoaded: true,
        user: action.payload.user
      };
    case USER_UPDATE_AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isLoaded: true,
        user: action.payload.user
      };
    case USER_AUTH_ERROR:
    case USER_LOGIN_FAIL:
    case USER_LOGOUT_SUCCESS:
    case USER_REGISTER_FAIL:
      localStorage.removeItem('usertoken');
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false,
        isLoaded: true,
      };

    default:
      return state;
  }
}
