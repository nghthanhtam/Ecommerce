import {
  GET_PRODUCT_CATES,
  ADD_PRODUCT_CATE,
  DELETE_PRODUCT_CATE,
  PRODUCT_CATE_DELETED,
  PRODUCT_CATES_RECEIVED,
  PRODUCT_CATE_ADDED,
  PRODUCT_CATE_UPDATED,
} from "../actions/types";

const initialState = {
  productCates: [],
  isLoaded: false,
  totalDocuments: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_CATES:
      return {
        ...state,
        isLoaded: false,
      };
    case PRODUCT_CATES_RECEIVED:
      return {
        ...state,
        productCates: action.payload.data.items,
        isLoaded: true,
        totalDocuments: action.payload.data.total,
      };
    case PRODUCT_CATE_ADDED:
      return {
        ...state,
        productCates: [action.payload, ...state.productCates],
        isLoaded: true,
      };
    case DELETE_PRODUCT_CATE:
      return {
        ...state,
      };
    case PRODUCT_CATE_DELETED:
      return {
        ...state,
        productCates: state.productCates.filter(
          (productCate) => productCate._id !== action.payload._id
        ),
      };
    case ADD_PRODUCT_CATE:
      return {
        ...state,
        isLoaded: false,
      };

    case PRODUCT_CATE_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
