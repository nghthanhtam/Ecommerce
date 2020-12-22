import {
  GET_PROMOTIONTYPES,
  ADD_PROMOTIONTYPE,
  PROMOTIONTYPE_DELETED,
  PROMOTIONTYPES_RECEIVED,
  PROMOTIONTYPE_ADDED,
  UPDATE_PROMOTIONTYPE,
  PROMOTIONTYPE_UPDATED,
  PROMOTIONTYPE_RECEIVED,
  GET_PROMOTIONTYPE_BY_ID,
} from "../actions/types";

const initialState = {
  promotionTypes: [],
  promotionType: {},
  totalDocuments: 0,
  isLoaded: false,
  isUpdated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROMOTIONTYPES:
      return {
        ...state,
      };

    case GET_PROMOTIONTYPE_BY_ID:
      return {
        ...state,
        isLoaded: false,
      };

    case PROMOTIONTYPES_RECEIVED:
      return {
        ...state,
        promotionTypes: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };

    case PROMOTIONTYPE_RECEIVED:
      return {
        ...state,
        promotionType: action.payload.data,
        isLoaded: true,
      };

    case ADD_PROMOTIONTYPE:
      return {
        ...state,
        isLoaded: false,
      };

    case PROMOTIONTYPE_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case PROMOTIONTYPE_DELETED:
      return {
        ...state,
        promotionTypes: state.promotionTypes.filter(
          (promotionType) => promotionType.id !== action.payload.id
        ),
      };

    case PROMOTIONTYPE_UPDATED:
      return {
        ...state,
        isUpdated: true,
      };

    case UPDATE_PROMOTIONTYPE:
      return {
        ...state,
        isUpdated: false,
      };

    default:
      return state;
  }
}
