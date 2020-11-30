import {
  GET_CITIES,
} from './types';

export const getCities = (params) => ({
  type: GET_CITIES,
  pages: params,
});