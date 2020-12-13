import {
  GET_RATINGS,
  ADD_RATING,
  DELETE_RATING,
  UPDATE_RATING,
  UPDATE_RATING_STATUS,
  ADD_RATING_IMAGE,
  GET_RATINGS_BY_PRODUCT
} from './types';

export const addRatingImage = (params) => ({
  type: ADD_RATING_IMAGE,
  pages: params,
});

export const getRatings = (params) => ({
  type: GET_RATINGS,
  pages: params,
});

export const getRatingsByProduct = (params) => ({
  type: GET_RATINGS_BY_PRODUCT,
  pages: params,
});

export const deleteRating = (id) => ({
  type: DELETE_RATING,
  id: id,
});

export const addRating = (newRating) => ({
  type: ADD_RATING,
  newRating: newRating,
});

export const updateRating = (newRating) => ({
  type: UPDATE_RATING,
  newRating: newRating,
});

export const updateRatingStatus = ({ status, id, pages }) => ({
  type: UPDATE_RATING_STATUS,
  params: { status, id, pages },
});