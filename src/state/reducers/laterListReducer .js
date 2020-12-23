import {
  GET_LATERLISTS,
  ADD_LATERLIST,
  LATERLIST_DELETED,
  LATERLISTS_RECEIVED,
  LATERLIST_ADDED,
  LATERLIST_UPDATED,
} from "../actions/types";

const initialState = {
  laterLists: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LATERLISTS:
      return {
        ...state,
      };
    case LATERLISTS_RECEIVED:
      return {
        ...state,
        laterLists: action.payload.data,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ADD_LATERLIST:
      return {
        ...state,
        isLoaded: false,
      };
    case LATERLIST_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case LATERLIST_DELETED:
      return {
        ...state,
        laterLists: state.laterLists.filter(
          (laterList) => laterList.id !== action.payload.id
        ),
      };

    case LATERLIST_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
