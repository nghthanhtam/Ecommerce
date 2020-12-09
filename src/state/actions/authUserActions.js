import { USER_LOADING, USER_LOGIN, USER_LOGOUT, USER_UPDATE_AUTH } from './types';

export const loadUser = () => ({
  type: USER_LOADING,
});

export const logout = () => ({
  type: USER_LOGOUT,
});

export const login = (user) => ({
  type: USER_LOGIN,
  user: user,
});

export const updateAuthUser = (token) => ({
  type: USER_UPDATE_AUTH,
  token: token,
});

export const tokenUserConfig = (getState) => {
  const token = getState.authUser.token;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  //Header
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};
