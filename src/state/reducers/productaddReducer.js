import { PRODUCTADD_UPDATED } from '../actions/types';

const initialState = {
  arrVariants: [{ name: '', values: [{ index: 0, label: '', value: '' }, { index: 1, label: '', value: '' }, { index: 2, label: '', value: '' }, { index: 3, label: '', value: '' }] }],
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PRODUCTADD_UPDATED:
      return {
        ...state,
        arrVariants: action.payload,
      };
    default:
      return state;
  }
}
