/*
 * @file: user.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @date: 03.09.2020
 * @author: Megha Sethi
*/

import * as TYPE from '../../constants/actionTypes/user';

/******** Reducers ********/

const initialState = {
  loggedIn: false,
  remember: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.LOGIN_SUCCESS:
      case TYPE.LOGIN_SUCCESS:
      return { ...state, ...{ loggedIn: true }, ...action.data };

    case TYPE.REMEMBER_ME:
      let remember = action.data;
      return { ...state, remember: remember };

    case TYPE.LOG_OUT:
      let _remember = state.remember;
      return { ...initialState, ...{ remember: _remember } };
    default:
      return state;
  }
}
