import * as TYPE from "../../constants/actionTypes/order";
import _ from "underscore";

/******** Reducers ********/

const initialState = {
  order: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPE.GET_SHIPMENT_RATE:
      const order = state.order;
      order.push(action.data);
      return { ...state, order: order };
    default:
      return state;
  }
}
