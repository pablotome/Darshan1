import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_DETAILS_REQUEST,
  ALL_DETAILS_SUCCESS,
  ALL_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return { loading: true, product: [] };

    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
      };

    case ALL_PRODUCT_FAIL:
      return { loading: false, product: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case ALL_DETAILS_REQUEST:
      return { loading: true, ...state };

    case ALL_DETAILS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case ALL_DETAILS_FAIL:
      return { loading: false, product: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
