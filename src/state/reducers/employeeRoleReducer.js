import {
  GET_EMPROLES,
  ADD_EMPROLE,
  EMPROLE_DELETED,
  EMPROLES_RECEIVED,
  EMPROLE_ADDED,
  EMPROLE_UPDATED,
} from '../actions/types';

const initialState = {
  emproles: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EMPROLES:
      return {
        ...state,
        isLoaded: true,
      };
    case EMPROLES_RECEIVED:
      return {
        ...state,
        emproles: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ADD_EMPROLE:
      return {
        ...state,
        isLoaded: false,
      };
    case EMPROLE_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case EMPROLE_DELETED:
      return {
        ...state,
        emproles: state.emproles.filter((emp) => emp.id !== action.payload.id),
      };

    case EMPROLE_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
