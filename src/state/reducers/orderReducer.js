import {
  GET_ORDERS_BY_SHOP,
  ADD_ORDER,
  ORDER_DELETED,
  ORDERS_RECEIVED,
  ORDER_ADDED,
  ORDER_UPDATED,
  ORDER_DETS_RECEIVED
} from '../actions/types';

const initialState = {
  orders: [],
  totalDocuments: 0,
  isLoaded: false,
  isOrderDetsLoaded: false,
  isAdded: false,
  ordersAdded: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_BY_SHOP:
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
    case ORDER_DETS_RECEIVED:
      return {
        ...state,
        order: action.payload.data,
        isOrderDetsLoaded: true,
      };
    case ADD_ORDER:
      return {
        ...state,
        isAdded: false,
        ordersAdded: []
      };
    case ORDER_ADDED:
      return {
        ...state,
        isAdded: true,
        ordersAdded: action.payload.data
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
