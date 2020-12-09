import {
  GET_ANSWERS,
  ADD_ANSWER,
  ANSWER_DELETED,
  ANSWERS_RECEIVED,
  ANSWER_ADDED,
  ANSWER_UPDATED,
} from '../actions/types';

const initialState = {
  answers: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ANSWERS:
      return {
        ...state,
      };
    case ANSWERS_RECEIVED:
      return {
        ...state,
        answers: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ADD_ANSWER:
      return {
        ...state,
        isLoaded: false,
      };
    case ANSWER_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case ANSWER_DELETED:
      return {
        ...state,
        answers: state.answers.filter(
          (answer) => answer.id !== action.payload.id
        ),
      };

    case ANSWER_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
