import {
  ADD_STOCK_HISTORY,
  STOCK_HISTORY_DELETED,
  STOCK_HISTORIES_RECEIVED,
  STOCK_HISTORY_ADDED,
  STOCK_HISTORY_UPDATED,
  STOCK_HISTORY_RECEIVED,
} from "../actions/types";

const initialState = {
  stockHises: [],
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STOCK_HISTORIES_RECEIVED:
      return {
        ...state,
        stockHises: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case STOCK_HISTORY_RECEIVED:
      return {
        ...state,
        history: action.payload.data,
        isLoaded: true,
      };
    case ADD_STOCK_HISTORY:
      return {
        ...state,
        isLoaded: false,
      };
    case STOCK_HISTORY_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case STOCK_HISTORY_DELETED:
      return {
        ...state,
        stockHises: state.stockHises.filter(
          (history) => history.id !== action.payload.id
        ),
      };

    case STOCK_HISTORY_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
