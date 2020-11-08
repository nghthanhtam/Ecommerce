import { UPDATE_PRODUCTADD } from '../actions/types';

const initialState = {
  arrVariants: [{ name: '', values: ['', '', '', '', ''] }],
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCTADD:
      return {
        ...state,
        //arrVariants: action.payload,
      };
    default:
      return state;
  }
}
