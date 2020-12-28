import { GET_PERMISSIONS } from "./types";

export const getPermissions = (params) => ({
  type: GET_PERMISSIONS,
  pages: params,
});
