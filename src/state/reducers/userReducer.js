import {
  GET_USERS,
  GET_USER_BY_ID,
  USER_RECEIVED,
  USERS_RECEIVED,
  ADD_USER,
  UPDATE_USER,
  USER_ADDED,
  USER_DELETED,
  USER_UPDATED,
  CLEAR_USER,
  USER_PASS_UPDATED_ERROR,
  ERRORS_RETURNED,
  SURVEY_ADDED,
  ADD_SURVEY,
} from "../actions/types";

const initialState = {
  users: [],
  totalDocuments: 0,
  isLoaded: false,
  isUpdated: false,
  user: {},
  isAdded: false,
  userAdded: {},
  isUpdatePassError: false,
  error: null,
  isSurVeyAdded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_USER:
      return {
        ...state,
        isAdded: false,
        userAdded: {},
      };
    case GET_USERS:
      return {
        ...state,
        isLoaded: false,
        isUpdated: false,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        isLoaded: false,
        isUpdated: false,
      };
    case USERS_RECEIVED:
      return {
        ...state,
        users: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case USER_RECEIVED:
      return {
        ...state,
        user: action.payload.data,
        isLoaded: true,
      };
    case ADD_SURVEY:
      return {
        ...state,
        isSurVeyAdded: false,
      };
    case SURVEY_ADDED:
      return {
        ...state,
        isSurVeyAdded: true,
      };
    case ADD_USER:
      return {
        ...state,
        isLoaded: false,
        isAdded: false,
      };
    case USER_ADDED:
      return {
        ...state,
        isAdded: true,
        userAdded: action.payload.data,
      };

    case USER_DELETED:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    case UPDATE_USER:
      return {
        ...state,
        isUpdated: false,
      };
    case USER_UPDATED:
      return {
        ...state,
        isUpdated: true,
        isUpdatePassError: false,
      };
    case USER_PASS_UPDATED_ERROR:
      return {
        ...state,
        isUpdatePassError: true,
      };
    case ERRORS_RETURNED:
      return {
        ...state,
        userAdded: action.payload.newUser,
      };
    default:
      return state;
  }
}
