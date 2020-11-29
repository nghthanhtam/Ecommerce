import {
  GET_PAYMENTS,
} from './types';

export const getPayments = (params) => ({
  type: GET_PAYMENTS,
  pages: params,
});