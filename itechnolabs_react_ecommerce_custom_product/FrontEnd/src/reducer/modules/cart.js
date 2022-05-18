/*
 * @file: cart.js
 * @description: Reducers and actions for store/manipulate cart's  data
 * @date: 22.09.2020
 * @author: Megha Sethi
 */

import * as TYPE from "../../constants/actionTypes/cart";
import _ from "underscore";

/******** Reducers ********/

const initialState = {
  cart: [],
  save_for_later: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.ADD_TO_CART:
      const cart = state.cart;
      cart.push(action.data);
      return { ...state, cart: cart };
    case TYPE.REMOVE_CART:
      state.cart.splice(action.data.index, 1);
      return { ...state, cart: state.cart };
    case TYPE.ADD_IN_SAVE_FOR_LATER:
      const save_for_later = state.save_for_later;
      save_for_later.push(action.data);
      return { ...state, save_for_later: state.save_for_later };
    case TYPE.REMOVE_SAVE_FOR_LATER:
      state.save_for_later.splice(action.data.index, 1);
      return { ...state, save_for_later: state.save_for_later };
    case TYPE.GET_CART:
      return {
        ...state,
        cart: action.data.cart,
        save_for_later: action.data.save_for_later,
      };
    case TYPE.UPDATE_TO_CART:
      state.cart[action.data.index] = action.data;
      return { ...state, cart: state.cart };
    case TYPE.DELETE_ALL_CART:
      state.cart = [];
      console.log(state.cart,"=== cart state")
      return state;
    case "LOG_OUT":
      return { ...initialState };
    default:
      return state;
  }
}
