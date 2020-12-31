import { SHOW_MODAL } from "../actions/types";

const initialState = {
  show: false,
  modalName: "",
  details: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        show: action.payload.show,
        modalName: action.payload.modalName,
        details: action.payload.details,
      };

    default:
      return state;
  }
}
