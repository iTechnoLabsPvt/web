/*
 * @file: products.js
 * @description: Reducers and actions for store/manipulate product's  data
 * @date: 22.09.2020
 * @author: Megha Sethi
*/

import * as TYPE from '../../constants/actionTypes/products';

/******** Reducers ********/

const initialState = {
  products: [],
  current_product_detail: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.ADD_PRODUCTS:
      return { ...state, products: action.data };
      case TYPE.ADD_PRODUCT_DETAIL:
        return { ...state, current_product_detail: action.data };
      case 'LOG_OUT':
        return { ...initialState };
    default:
      return state;
  }
}
