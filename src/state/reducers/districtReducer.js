import {
  GET_DISTRICTS,
  DISTRICTS_RECEIVED,
} from '../actions/types';

const initialState = {
  districts: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DISTRICTS:
      return {
        ...state,
      };

    case DISTRICTS_RECEIVED:
      return {
        ...state,
        districts: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };

    default:
      return state;
  }
}
