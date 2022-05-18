/*
 * @file: locale.js
 * @description: Reducers and actions for store/manipulate locale's  data
 * @date: 07.04.2020
 * @author: Megha Sethi
*/

import * as TYPE from '../../constants/actionTypes/locale';

/******** Reducers ********/

const initialState = {
  lang: 'en'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.LOCALE_CHANGE:
      let locale = action.data;
      return { ...state, lang: locale };
    default:
      return state;
  }
}
