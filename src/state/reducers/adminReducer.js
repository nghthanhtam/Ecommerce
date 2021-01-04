import {
  GET_ADMINS,
  ADD_ADMIN,
  ADMIN_DELETED,
  ADMINS_RECEIVED,
  ADMIN_ADDED,
  ADMIN_UPDATED,
  ADMIN_RECEIVED,
  GET_ADMIN_BY_ID,
} from "../actions/types";

const initialState = {
  admins: [],
  totalDocuments: 0,
  isLoaded: false,
  isUpdated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADMINS:
      return {
        ...state,
        isLoaded: false,
        isUpdated: false,
      };
    case GET_ADMIN_BY_ID:
      return {
        ...state,
        isLoaded: false,
      };
    case ADMINS_RECEIVED:
      return {
        ...state,
        admins: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ADMIN_RECEIVED:
      return {
        ...state,
        admin: action.payload.data,
        isLoaded: true,
      };
    case ADD_ADMIN:
      return {
        ...state,
        isLoaded: false,
      };
    case ADMIN_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case ADMIN_DELETED:
      return {
        ...state,
        admins: state.admins.filter((emp) => emp.id !== action.payload.id),
      };

    case ADMIN_UPDATED:
      return {
        ...state,
        isUpdated: true,
      };

    default:
      return state;
  }
}
