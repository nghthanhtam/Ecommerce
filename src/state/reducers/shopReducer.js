import {
  GET_SHOPS,
  ADD_SHOP,
  SHOP_DELETED,
  SHOPS_RECEIVED,
  SHOP_ADDED,
  SHOP_UPDATED,
  SHOP_RECEIVED
} from '../actions/types';

const initialState = {
  shops: [],
  shop: {},
  totalDocuments: 0,
  isLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SHOPS:
      return {
        ...state,
      };
    case SHOPS_RECEIVED:
      return {
        ...state,
        shops: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case SHOP_RECEIVED:
      return {
        ...state,
        shop: action.payload.data,
        isLoaded: true,
      };
    case ADD_SHOP:
      return {
        ...state,
        isLoaded: false,
      };
    case SHOP_ADDED:
      return {
        ...state,
        isLoaded: true,
      };

    case SHOP_DELETED:
      return {
        ...state,
        shops: state.shops.filter(
          (shop) => shop.id !== action.payload.id
        ),
      };

    case SHOP_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
