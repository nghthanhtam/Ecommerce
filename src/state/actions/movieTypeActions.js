import {
  GET_MOVIETYPES,
  ADD_MOVIETYPE,
  DELETE_MOVIETYPE,
  UPDATE_MOVIETYPE,
  GET_MOVIETYPE_BY_ID,
} from "./types";

export const getMovieTypes = (params) => ({
  type: GET_MOVIETYPES,
  pages: params,
});

export const getMovieTypeById = (id) => ({
  type: GET_MOVIETYPE_BY_ID,
  id,
});

export const deleteMovie = (id) => ({
  type: DELETE_MOVIETYPE,
  id,
});

export const addMovie = (newMovie) => ({
  type: ADD_MOVIETYPE,
  newMovie,
});

export const updateMovie = (newMovie) => ({
  type: UPDATE_MOVIETYPE,
  newMovie,
});
