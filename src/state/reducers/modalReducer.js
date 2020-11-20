import {
  SHOW_MODAL,
} from "../actions/types";

const initialState = {
  show: false,
};

export default function (state = initialState, action) {
  console.log('abccc: ', action.payload);
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        show: action.payload.show
      };

    default:
      return state;
  }
}
