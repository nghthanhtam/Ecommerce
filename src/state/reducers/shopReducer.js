import {
  GET_SHOPS,
  ADD_SHOP,
  SHOP_DELETED,
  SHOPS_RECEIVED,
  SHOP_ADDED,
  SHOP_UPDATED,
} from '../actions/types';

const initialState = {
  shops: [],
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SHOPS:
      return {
        ...state,
        isLoaded: true,
      };
    case SHOPS_RECEIVED:
      return { ...state, shops: action.payload.data, isLoaded: true };
    case ADD_SHOP:
      return {
        ...state,
        isLoaded: false,
      };
    case SHOP_ADDED:
      return {
        ...state,
        shops: [action.payload, ...state.shops],
        isLoaded: true,
      };

    case SHOP_DELETED:
      return {
        ...state,
        shops: state.shops.filter((shop) => shop.id !== action.payload.id),
      };

    case SHOP_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
