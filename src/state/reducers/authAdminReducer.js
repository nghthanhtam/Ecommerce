import {
  ADMIN_LOADED,
  AUTH_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_UPDATE_AUTH_SUCCESS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('adminToken'),
  isAuthenticated: false,
  admin: null,
  role: null,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        admin: action.payload,
        isLoaded: true,
      };
    case ADMIN_LOGIN_SUCCESS:
    case ADMIN_REGISTER_SUCCESS:
      localStorage.setItem('adminToken', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isLoaded: true,
        admin: action.payload.admin
      };
    case ADMIN_UPDATE_AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isLoaded: true,
        admin: action.payload.admin
      };
    case AUTH_ERROR:
    case ADMIN_LOGIN_FAIL:
    case ADMIN_LOGOUT_SUCCESS:
    case ADMIN_REGISTER_FAIL:
      localStorage.removeItem('adminToken');
      return {
        ...state,
        token: null,
        admin: null,
        isLoading: false,
        isAuthenticated: false,
        isLoaded: true,
      };

    default:
      return state;
  }
}
