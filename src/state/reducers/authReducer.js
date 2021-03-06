import {
  EMPLOYEE_LOADED,
  EMPLOYEE_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_AUTH_SUCCESS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  employee: null,
  role: null,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EMPLOYEE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case EMPLOYEE_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        employee: action.payload,
        isLoaded: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isLoaded: true,
        employee: action.payload.employee
      };
    case UPDATE_AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isLoaded: true,
        employee: action.payload.employee
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        employee: null,
        isLoading: false,
        isAuthenticated: false,
        isLoaded: true,
      };

    default:
      return state;
  }
}
