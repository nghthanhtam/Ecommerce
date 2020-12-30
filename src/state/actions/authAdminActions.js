import { ADMIN_LOGOUT, ADMIN_LOGIN, ADMIN_UPDATE_AUTH } from "./types";

export const login = (admin) => ({
  type: ADMIN_LOGIN,
  admin: admin,
});

export const logout = () => ({
  type: ADMIN_LOGOUT,
});

export const updateAuthAdmin = (token) => ({
  type: ADMIN_UPDATE_AUTH,
  token: token,
});

export const tokenAdminConfig = (getState) => {
  //Get token from local storage
  const token = getState.authAdmin.token;
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //Header
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
