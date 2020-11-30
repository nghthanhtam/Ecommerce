import {
  GET_WARDS,
  WARDS_RECEIVED,
} from '../actions/types';

const initialState = {
  wards: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WARDS:
      return {
        ...state,
      };

    case WARDS_RECEIVED:
      return {
        ...state,
        wards: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };

    default:
      return state;
  }
}
