import { UPDATE_PRODUCTADD } from './types';

export const updateProduct = (params) => ({
  type: UPDATE_PRODUCTADD,
  payload: params,
});
