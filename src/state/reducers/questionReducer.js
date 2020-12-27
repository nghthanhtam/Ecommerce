import {
  GET_QUESTIONS,
  ADD_QUESTION,
  QUESTION_DELETED,
  QUESTIONS_RECEIVED,
  QUESTION_ADDED,
  QUESTION_UPDATED,
  GET_QUESTIONS_BY_PRODUCT,
} from "../actions/types";

const initialState = {
  questions: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
      };
    case GET_QUESTIONS_BY_PRODUCT:
      return {
        ...state,
        isLoaded: false,
      };
    case QUESTIONS_RECEIVED:
      return {
        ...state,
        questions: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ADD_QUESTION:
      return {
        ...state,
        isLoaded: false,
      };
    case QUESTION_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case QUESTION_DELETED:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question.id !== action.payload.id
        ),
      };

    case QUESTION_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
