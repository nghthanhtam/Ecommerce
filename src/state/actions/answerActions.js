import {
  GET_ANSWERS,
  ADD_ANSWER,
  DELETE_ANSWER,
  UPDATE_ANSWER,
  UPDATE_ANSWER_STATUS
} from './types';

export const getAnswers = (params) => ({
  type: GET_ANSWERS,
  pages: params,
});

export const deleteAnswer = (id) => ({
  type: DELETE_ANSWER,
  id: id,
});

export const addAnswer = (newAnswer) => ({
  type: ADD_ANSWER,
  newAnswer: newAnswer,
});

export const updateAnswer = (newAnswer) => ({
  type: UPDATE_ANSWER,
  newAnswer: newAnswer,
});

export const updateAnswerStatus = ({ status, id }) => ({
  type: UPDATE_ANSWER_STATUS,
  params: { status, id },
});