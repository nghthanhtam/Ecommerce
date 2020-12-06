import {
  GET_RATINGS,
  ADD_RATING,
  DELETE_RATING,
  UPDATE_RATING,
  ADD_RATING_IMAGE
} from './types';

export const addRatingImage = (params) => ({
  type: ADD_RATING_IMAGE,
  pages: params,
});

export const getRatings = (params) => ({
  type: GET_RATINGS,
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
