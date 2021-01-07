import {
  GET_MOVIE_CATES,
  ADD_MOVIE_CATE,
  DELETE_MOVIE_CATE,
  MOVIE_CATE_DELETED,
  MOVIE_CATES_RECEIVED,
  MOVIE_CATE_ADDED,
  MOVIE_CATE_UPDATED,
} from "../actions/types";

const initialState = {
  movieCates: [],
  movieCate: {},
  isLoaded: false,
  totalDocuments: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE_CATES:
      return {
        ...state,
      };
    case MOVIE_CATES_RECEIVED:
      return {
        ...state,
        movieCates: action.payload.data.items,
        isLoaded: true,
        totalDocuments: action.payload.data.total,
      };
    case MOVIE_CATE_ADDED:
      return {
        ...state,
        movieCates: [action.payload, ...state.movieCates],
        isLoaded: true,
      };
    case DELETE_MOVIE_CATE:
      return {
        ...state,
      };
    case MOVIE_CATE_DELETED:
      return {
        ...state,
        movieCates: state.movieCates.filter(
          (movieCate) => movieCate._id !== action.payload._id
        ),
      };
    case ADD_MOVIE_CATE:
      return {
        ...state,
        isLoaded: false,
      };

    case MOVIE_CATE_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
