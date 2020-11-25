import {
  SHOW_MODAL,
} from "../actions/types";

const initialState = {
  show: false,
  modalName: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        show: action.payload.show,
        modalName: action.payload.modalName
      };

    default:
      return state;
  }
}
