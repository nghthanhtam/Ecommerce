import {
  GET_ADDRESSES,
  ADD_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
} from './types';

export const getAddresses = (params) => ({
  type: GET_ADDRESSES,
  pages: params,
});

export const deleteAddress = (id) => ({
  type: DELETE_ADDRESS,
  id: id,
});

export const addAddress = (newAddress) => ({
  type: ADD_ADDRESS,
  newAddress: newAddress,
});

export const updateAddress = (newAddress) => ({
  type: UPDATE_ADDRESS,
  newAddress: newAddress,
});