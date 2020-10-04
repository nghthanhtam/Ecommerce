import { ERRORS_CLEARED, ERRORS_RETURNED } from "../actions/types";

const initalState = {
  msg: {},
  status: null,
  id: null,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case ERRORS_RETURNED:
      return {
        msg: action.payload.msg.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case ERRORS_CLEARED:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
