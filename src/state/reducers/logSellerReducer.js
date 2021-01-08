import {
  GET_LOGSELLERS,
  LOGSELLERS_RECEIVED,
  LOGSELLER_RECEIVED,
  GET_LOGSELLER_BY_ID,
} from "../actions/types";

const initialState = {
  sellerLogs: [],
  logseller: {},
  totalDocuments: 0,
  isLoaded: false,
  isUpdated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOGSELLERS:
      return {
        ...state,
      };

    case GET_LOGSELLER_BY_ID:
      return {
        ...state,
        isLoaded: false,
      };

    case LOGSELLERS_RECEIVED:
      return {
        ...state,
        sellerLogs: action.payload.data.sellerLogs,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };

    case LOGSELLER_RECEIVED:
      return {
        ...state,
        logseller: action.payload.data,
        isLoaded: true,
      };

    default:
      return state;
  }
}
