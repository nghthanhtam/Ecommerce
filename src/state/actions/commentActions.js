import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  UPDATE_COMMENT_STATUS
} from './types';

export const getComments = (params) => ({
  type: GET_COMMENTS,
  pages: params,
});

export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id: id,
});

export const addComment = (newCmt) => ({
  type: ADD_COMMENT,
  newCmt: newCmt,
});

export const updateComment = (newCmt) => ({
  type: UPDATE_COMMENT,
  newCmt: newCmt,
});

export const updateCommentStatus = ({ status, id, pages }) => ({
  type: UPDATE_COMMENT_STATUS,
  params: { status, id, pages },
});