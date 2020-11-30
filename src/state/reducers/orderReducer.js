import {
  GET_ORDERS,
  ADD_ORDER,
  ORDER_DELETED,
  ORDERS_RECEIVED,
  ORDER_ADDED,
  ORDER_UPDATED,
} from '../actions/types';

const initialState = {
  orders: [],
  totalDocuments: 0,
  isLoaded: false,
  isAdded: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
      };
    case ORDERS_RECEIVED:
      return {
        ...state,
        orders: action.payload.data.items,
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ADD_ORDER:
      return {
        ...state,
        isAdded: false,
      };
    case ORDER_ADDED:
      return {
        ...state,
        isAdded: true,
      };

    case ORDER_DELETED:
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order.id !== action.payload.id
        ),
      };

    case ORDER_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
