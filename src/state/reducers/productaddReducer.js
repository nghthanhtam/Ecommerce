import { UPDATE_PRODUCTADD } from '../actions/types';

const initialState = {
  productadds: [],
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCTADD:
      return {
        ...state,
        productadds: action.payload,
      };
    default:
      return state;
  }
}
