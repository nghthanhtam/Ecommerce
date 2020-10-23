import {
  GET_ROLES,
  ADD_ROLE,
  DELETE_ROLE,
  ROLES_ADDED,
  ROLE_DELETED,
  ROLES_RECEIVED,
  ROLE_UPDATED,
} from "../actions/types";

const initialState = {
  roles: [],

  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROLES:
      return {
        ...state,
        //roles: action.payload,
        isLoaded: true,
      };
    case ROLES_RECEIVED:
      return { ...state, roles: action.payload.data, isLoaded: true };
    case DELETE_ROLE:
      return {
        ...state,
      };
    case ROLE_DELETED:
      return {
        ...state,
        roles: state.roles.filter((r) => r._id !== action.payload._id),
      };
    case ADD_ROLE:
      return {
        ...state,
        //roles: [action.payload, ...state.roles],
        isLoaded: false,
      };
    case ROLES_ADDED:
      return {
        ...state,
        roles: [action.payload, ...state.roles],
        isLoaded: true,
      };
    case ROLE_UPDATED:
      return {
        ...state,
      };
    default:
      return state;
  }
}
