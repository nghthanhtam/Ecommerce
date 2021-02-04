import {
  GET_PROMOTIONS,
  ADD_PROMOTION,
  PROMOTION_DELETED,
  PROMOTIONS_RECEIVED,
  PROMOTION_ADDED,
  UPDATE_PROMOTION,
  PROMOTION_UPDATED,
  PROMOTION_RECEIVED,
  GET_PROMOTION_BY_ID,
  PROMOTION_ERROR,
} from "../actions/types";

const initialState = {
  promotions: [],
  promotion: {},
  totalDocuments: 0,
  isLoaded: false,
  isUpdated: false,
  isAdded: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROMOTIONS:
      return {
        ...state,
        isLoaded: false,
        isUpdated: false,
      };

    case GET_PROMOTION_BY_ID:
      return {
        ...state,
        isLoaded: false,
        isUpdated: false,
      };

    case PROMOTIONS_RECEIVED:
      return {
        ...state,
        promotions: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };

    case PROMOTION_RECEIVED:
      return {
        ...state,
        promotion: action.payload.data,
        isLoaded: true,
        isUpdated: false,
      };

    case ADD_PROMOTION:
      return {
        ...state,
        isLoaded: false,
      };

    case PROMOTION_ADDED:
      return {
        ...state,
        isAdded: true,
        error: null,
      };

    case PROMOTION_DELETED:
      return {
        ...state,
        promotions: state.promotions.filter(
          (promotion) => promotion.id !== action.payload.id
        ),
      };

    case PROMOTION_UPDATED:
      return {
        ...state,
        isUpdated: true,
        error: null,
      };

    case UPDATE_PROMOTION:
      return {
        ...state,
        isUpdated: false,
      };

    case PROMOTION_ERROR:
      return {
        ...state,
        isLoaded: true,
        error: "Mã giảm giá đã tồn tại",
      };
    default:
      return state;
  }
}
