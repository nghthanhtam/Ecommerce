import {
  GET_PAYMENTS,
  PAYMENTS_RECEIVED,
} from '../actions/types';

const initialState = {
  payments: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENTS:
      return {
        ...state,
      };

    case PAYMENTS_RECEIVED:
      return {
        ...state,
        payments: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };

    default:
      return state;
  }
}
