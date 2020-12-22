import {
  GET_PROMOTIONTYPES,
  ADD_PROMOTIONTYPE,
  DELETE_PROMOTIONTYPE,
  UPDATE_PROMOTIONTYPE,
  GET_PROMOTIONTYPE_BY_ID,
} from "./types";

export const getPromotionTypes = (params) => ({
  type: GET_PROMOTIONTYPES,
  pages: params,
});

export const getPromotionTypeById = (id) => ({
  type: GET_PROMOTIONTYPE_BY_ID,
  id,
});

export const deletePromotion = (id) => ({
  type: DELETE_PROMOTIONTYPE,
  id,
});

export const addPromotion = (newPromotion) => ({
  type: ADD_PROMOTIONTYPE,
  newPromotion,
});

export const updatePromotion = (newPromotion) => ({
  type: UPDATE_PROMOTIONTYPE,
  newPromotion,
});
