import {
  GET_QUESTIONS,
  ADD_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
  UPDATE_QUESTION_STATUS,
  GET_QUESTIONS_BY_PRODUCT,
} from "./types";

export const getQuestions = (params) => ({
  type: GET_QUESTIONS,
  pages: params,
});

export const getQuestionsByProduct = (params) => ({
  type: GET_QUESTIONS_BY_PRODUCT,
  pages: params,
});

export const deleteQuestion = (id) => ({
  type: DELETE_QUESTION,
  id: id,
});

export const addQuestion = (newQuestion) => ({
  type: ADD_QUESTION,
  newQuestion: newQuestion,
});

export const updateQuestion = (newQuestion) => ({
  type: UPDATE_QUESTION,
  newQuestion: newQuestion,
});

export const updateQuestionStatus = ({ status, id, pages }) => ({
  type: UPDATE_QUESTION_STATUS,
  params: { status, id, pages },
});
