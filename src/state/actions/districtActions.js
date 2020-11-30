import {
  GET_DISTRICTS,
} from './types';

export const getDistricts = (params) => ({
  type: GET_DISTRICTS,
  pages: params,
});