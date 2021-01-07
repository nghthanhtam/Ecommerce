import { GET_LOGADMINS, GET_LOGADMIN_BY_ID } from "./types";

export const getLogAdmins = (params) => ({
  type: GET_LOGADMINS,
  pages: params,
});

export const getLogAdminById = (id) => ({
  type: GET_LOGADMIN_BY_ID,
  id,
});
