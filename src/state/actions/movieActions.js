import {
  GET_MOVIES,
  ADD_MOVIE,
  DELETE_MOVIE,
  UPDATE_MOVIE,
  GET_EMPLOYEE_BY_ID,
} from "./types";

export const getMovies = (params) => ({
  type: GET_MOVIES,
  pages: params,
});

export const getMovieById = (id) => ({
  type: GET_EMPLOYEE_BY_ID,
  id,
});

export const deleteMovie = (id) => ({
  type: DELETE_MOVIE,
  id: id,
});

export const addMovie = (newMovie) => ({
  type: ADD_MOVIE,
  newMovie: newMovie,
});

export const updateMovie = (newMovie) => ({
  type: UPDATE_MOVIE,
  newMovie: newMovie,
});
