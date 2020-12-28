import {
  GET_ROLEADMINS,
  ADD_ROLEADMIN,
  DELETE_ROLEADMIN,
  UPDATE_ROLEADMIN,
  ROLEADMIN_ADDED,
  ROLEADMIN_DELETED,
  ROLEADMINS_RECEIVED,
  ROLEADMIN_UPDATED,
  ROLEADMIN_RECEIVED,
  GET_ROLEADMIN_BY_ID,
} from "../actions/types";

const initialState = {
  roleAdmins: [],
  rolePermissions: [],
  roleAdmin: {},
  totalDocuments: 0,
  isLoaded: false,
  isUpdated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ROLEADMINS:
      return {
        ...state,
        isUpdated: false,
        isLoaded: false,
      };
    case GET_ROLEADMIN_BY_ID:
      return {
        ...state,
        isUpdated: false,
        isLoaded: false,
      };
    case ROLEADMINS_RECEIVED:
      return {
        ...state,
        roleAdmins: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ROLEADMIN_RECEIVED:
      return {
        ...state,
        roleAdmin: action.payload.data,
        isLoaded: true,
        rolePermissions: action.payload.data.RolePermissions.map(
          ({ idPermission }) => idPermission
        ),
      };
    case ADD_ROLEADMIN:
      return {
        ...state,
        isLoaded: false,
      };
    case ROLEADMIN_ADDED:
      return {
        ...state,
        isLoaded: true,
      };
    case ROLEADMIN_DELETED:
      return {
        ...state,
        roleAdmins: state.roleAdmins.filter(
          (roleAdmin) => roleAdmin.id !== action.payload.id
        ),
      };
    case UPDATE_ROLEADMIN:
      return {
        ...state,
        isUpdated: false,
      };
    case ROLEADMIN_UPDATED:
      return {
        ...state,
        isUpdated: true,
      };
    default:
      return state;
  }
}
