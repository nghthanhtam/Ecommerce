import {
  GET_ORDERS_BY_SHOP,
  GET_ORDERS,
  ADD_ORDER,
  ORDER_DELETED,
  ORDERS_RECEIVED,
  ORDER_ADDED,
  ORDER_UPDATED,
  ORDER_DETS_RECEIVED,
  RESET_ORDER,
  GET_ORDERS_BY_PURCHASE,
  ORDERS_BY_PURCHASE_RECEIVED,
  ADMIN_ORDERS_RECEIVED,
} from "../actions/types";

const initialState = {
  orders: [],
  total: 0,
  totalDocuments: 0,
  isLoaded: false,
  isAdminOrdersLoaded: false,
  isOrderDetsLoaded: false,
  isAdded: false,
  ordersAdded: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_ORDER:
      return {
        ...state,
        isAdded: false,
        isAdminOrdersLoaded: false,
      };
    case GET_ORDERS_BY_SHOP:
      return {
        ...state,
        isLoaded: false,
      };
    case GET_ORDERS:
      return {
        ...state,
        isAdminOrdersLoaded: false,
      };
    case ADMIN_ORDERS_RECEIVED:
      return {
        ...state,
        orders: action.payload.data.items.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        totalDocuments: action.payload.data.total,
        isAdminOrdersLoaded: true,
      };
    case GET_ORDERS_BY_PURCHASE:
      return {
        ...state,
        isLoaded: false,
        isAdminOrdersLoaded: false,
      };
    case ORDERS_RECEIVED:
      return {
        ...state,
        orders: action.payload.data.items.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        totalDocuments: action.payload.data.total,
        isLoaded: true,
      };
    case ORDERS_BY_PURCHASE_RECEIVED:
      return {
        ...state,
        orders: action.payload.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        isLoaded: true,
      };
    case ORDER_DETS_RECEIVED:
      return {
        ...state,
        total: action.payload.total,
        order: action.payload.item.data,
        isOrderDetsLoaded: true,
      };
    case ADD_ORDER:
      return {
        ...state,
        isAdded: false,
        ordersAdded: [],
      };
    case ORDER_ADDED:
      return {
        ...state,
        isAdded: true,
        ordersAdded: action.payload.data,
      };

    case ORDER_DELETED:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload.id),
      };

    case ORDER_UPDATED:
      return {
        ...state,
      };
    default:
      return state;
  }
}
