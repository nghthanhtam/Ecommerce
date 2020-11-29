import {
  GET_ADDRESSES,
  ADD_ADDRESS,
  ADDRESS_DELETED,
  ADDRESSES_RECEIVED,
  ADDRESS_ADDED,
  ADDRESS_UPDATED,
} from '../actions/types';

const initialState = {
  addresses: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADDRESSES:
      return {
        ...state,
        //isLoaded: true,
      };
    case ADDRESSES_RECEIVED:
      return {
        ...state,
        addresses: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ADD_ADDRESS:
      return {
        ...state,
        isLoaded: false,
      };
    case ADDRESS_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case ADDRESS_DELETED:
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address.id !== action.payload.id
        ),
      };

    case ADDRESS_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
