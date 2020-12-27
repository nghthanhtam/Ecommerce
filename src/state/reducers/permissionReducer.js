import {
  GET_PERMISSIONS,
  ADD_PERMISSION,
  DELETE_PERMISSION,
  PERMISSION_ADDED,
  PERMISSION_DELETED,
  PERMISSIONS_RECEIVED,
  PERMISSION_UPDATED,
} from "../actions/types";

const initialState = {
  permissions: [],

  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PERMISSIONS:
      return {
        ...state,
      };
    case PERMISSIONS_RECEIVED:
      return {
        ...state,
        permissions: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ADD_PERMISSION:
      return {
        ...state,
        isLoaded: false,
      };
    case PERMISSION_ADDED:
      return {
        ...state,
        isLoaded: true,
      };
    case PERMISSION_DELETED:
      return {
        ...state,
        permissions: state.permissions.filter(
          (permission) => permission.id !== action.payload.id
        ),
      };

    case PERMISSION_UPDATED:
      return {
        ...state,
      };
    default:
      return state;
  }
}
