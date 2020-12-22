import {
  GET_PROMOTIONS,
  ADD_PROMOTION,
  DELETE_PROMOTION,
  UPDATE_PROMOTION,
  GET_PROMOTION_BY_ID,
} from "./types";

export const getPromotions = (params) => ({
  type: GET_PROMOTIONS,
  pages: params,
});

export const getPromotionById = (id) => ({
  type: GET_PROMOTION_BY_ID,
  id,
});

export const deletePromotion = (id) => ({
  type: DELETE_PROMOTION,
  id,
});

export const addPromotion = (newPromotion) => ({
  type: ADD_PROMOTION,
  newPromotion,
});

export const updatePromotion = (newPromotion) => ({
  type: UPDATE_PROMOTION,
  newPromotion,
});
