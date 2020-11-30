import {
  GET_CITIES,
  CITIES_RECEIVED,
} from '../actions/types';

const initialState = {
  cities: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
      };

    case CITIES_RECEIVED:
      return {
        ...state,
        cities: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };

    default:
      return state;
  }
}
