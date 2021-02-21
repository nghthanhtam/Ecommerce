import {
  GET_PURCHASES,
  ADD_PURCHASE,
  PURCHASE_DELETED,
  PURCHASES_RECEIVED,
  PURCHASE_ADDED,
  UPDATE_PURCHASE,
  PURCHASE_UPDATED,
  PURCHASE_RECEIVED,
  GET_PURCHASE_BY_ID,
} from "../actions/types";

const initialState = {
  purchases: [],
  purchase: {},
  totalDocuments: 0,
  isLoaded: false,
  isUpdated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PURCHASES:
      return {
        ...state,
      };

    case GET_PURCHASE_BY_ID:
      return {
        ...state,
        isLoaded: false,
      };

    case PURCHASES_RECEIVED:
      return {
        ...state,
        purchases: action.payload.data.items.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };

    case PURCHASE_RECEIVED:
      return {
        ...state,
        purchase: action.payload.data,
        isLoaded: true,
      };

    case ADD_PURCHASE:
      return {
        ...state,
        isLoaded: false,
      };

    case PURCHASE_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case PURCHASE_DELETED:
      return {
        ...state,
        purchases: state.purchases.filter(
          (purchase) => purchase.id !== action.payload.id
        ),
      };

    case PURCHASE_UPDATED:
      return {
        ...state,
        isUpdated: true,
      };

    case UPDATE_PURCHASE:
      return {
        ...state,
        isUpdated: false,
      };

    default:
      return state;
  }
}
