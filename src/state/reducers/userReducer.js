import {
  GET_USERS,
  ADD_USER,
  USER_DELETED,
  USERS_LOADING,
  CHECK_CUR_PASS_USER
} from "../actions/types";

const initialState = {
  users: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case USER_DELETED:
      return {
        ...state,
        users: state.users.filter(
          user => user.id !== action.payload.id
        )
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
    case CHECK_CUR_PASS_USER:
      return {
        ...state,
        checkCurPass: true
      };
    default:
      return state;
  }
}
