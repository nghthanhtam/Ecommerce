import {
  GET_MOVIE_CATES,
  ADD_MOVIE_CATE,
  DELETE_MOVIE_CATE,
  UPDATE_MOVIE_CATE,
  GET_MOVIE_CATE_BY_ID,
} from "./types";

export const getMovieCates = (params) => ({
  type: GET_MOVIE_CATES,
  pages: params,
});

export const getMovieCateById = (id) => ({
  type: GET_MOVIE_CATE_BY_ID,
  id,
});

export const deleteMovieCate = (id) => ({
  type: DELETE_MOVIE_CATE,
  id: id,
});

export const addMovieCate = (newMovieCate) => ({
  type: ADD_MOVIE_CATE,
  newMovieCate: newMovieCate,
});

export const updateMovieCate = (newMovieCate) => ({
  type: UPDATE_MOVIE_CATE,
  newMovieCate,
});
