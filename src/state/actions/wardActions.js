import {
  GET_WARDS,
} from './types';

export const getWards = (params) => ({
  type: GET_WARDS,
  pages: params,
});