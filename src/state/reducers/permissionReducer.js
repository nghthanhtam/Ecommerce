import { GET_PERMISSIONS, PERMISSIONS_RECEIVED } from "../actions/types";

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

    default:
      return state;
  }
}
