import {
  GET_ROLES,
  ADD_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE,
  ROLE_ADDED,
  ROLE_DELETED,
  ROLES_RECEIVED,
  ROLE_UPDATED,
  ROLE_RECEIVED,
  GET_ROLE_BY_ID,
} from "../actions/types";

const initialState = {
  roles: [],
  rolePermissions: [],
  role: {},
  totalDocuments: 0,
  isLoaded: false,
  isUpdated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROLES:
      return {
        ...state,
        isUpdated: false,
        isLoaded: false,
      };
    case GET_ROLE_BY_ID:
      return {
        ...state,
        isUpdated: false,
        isLoaded: false,
      };
    case ROLES_RECEIVED:
      return {
        ...state,
        roles: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ROLE_RECEIVED:
      return {
        ...state,
        role: action.payload.data,
        isLoaded: true,
        rolePermissions: action.payload.data.RolePermissions.map(
          ({ idPermission }) => idPermission
        ),
      };
    case ADD_ROLE:
      return {
        ...state,
        isLoaded: false,
      };
    case ROLE_ADDED:
      return {
        ...state,
        isLoaded: true,
      };
    case ROLE_DELETED:
      return {
        ...state,
        roles: state.roles.filter((role) => role.id !== action.payload.id),
      };
    case UPDATE_ROLE:
      return {
        ...state,
        isUpdated: false,
      };
    case ROLE_UPDATED:
      return {
        ...state,
        isUpdated: true,
      };
    default:
      return state;
  }
}
