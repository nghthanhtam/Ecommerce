import { GET_LOGSELLERS, GET_LOGSELLER_BY_ID } from "./types";

export const getLogSellers = (params) => ({
  type: GET_LOGSELLERS,
  pages: params,
});

export const getLogSellerById = (id) => ({
  type: GET_LOGSELLER_BY_ID,
  id,
});
