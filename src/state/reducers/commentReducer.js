import {
  GET_COMMENTS,
  ADD_COMMENT,
  COMMENT_DELETED,
  COMMENTS_RECEIVED,
  COMMENT_ADDED,
  COMMENT_UPDATED,
} from '../actions/types';

const initialState = {
  comments: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
      };
    case COMMENTS_RECEIVED:
      return {
        ...state,
        comments: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ADD_COMMENT:
      return {
        ...state,
        isLoaded: false,
      };
    case COMMENT_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case COMMENT_DELETED:
      return {
        ...state,
        comments: state.comments.filter(
          (cmt) => cmt.id !== action.payload.id
        ),
      };

    case COMMENT_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
