import { SHOW_NOTI } from "../actions/types";
import { REMOVE_NOTIFICATION, ADD_NOTIFICATION } from "react-redux-notify";
const initialState = {
  showNoti: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTI:
      return {
        ...state,
        showNoti: true,
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
      };
    default:
      return state;
  }
}
