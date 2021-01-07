import {
  GET_MOVIES,
  ADD_MOVIE,
  MOVIE_DELETED,
  MOVIES_RECEIVED,
  MOVIE_ADDED,
  MOVIE_UPDATED,
  MOVIE_RECEIVED,
} from "../actions/types";

const initialState = {
  movies: [],
  movie: {},
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        //d: true,
      };
    case MOVIES_RECEIVED:
      return {
        ...state,
        movies: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case MOVIE_RECEIVED:
      return {
        ...state,
        movie: action.payload.data,
        isLoaded: true,
      };
    case ADD_MOVIE:
      return {
        ...state,
        isLoaded: false,
      };
    case MOVIE_ADDED:
      return {
        ...state,
        isLoaded: true,
      };
    case MOVIE_DELETED:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload.id),
      };

    case MOVIE_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
