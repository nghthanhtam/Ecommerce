import {
  GET_LOGADMINS,
  LOGADMINS_RECEIVED,
  LOGADMIN_RECEIVED,
  GET_LOGADMIN_BY_ID,
} from "../actions/types";

const initialState = {
  adminLogs: [],
  logadmin: {},
  totalDocuments: 0,
  isLoaded: false,
  isUpdated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOGADMINS:
      return {
        ...state,
      };

    case GET_LOGADMIN_BY_ID:
      return {
        ...state,
        isLoaded: false,
      };

    case LOGADMINS_RECEIVED:
      return {
        ...state,
        adminLogs: action.payload.data.adminLogs,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };

    case LOGADMIN_RECEIVED:
      return {
        ...state,
        logadmin: action.payload.data,
        isLoaded: true,
      };

    default:
      return state;
  }
}
