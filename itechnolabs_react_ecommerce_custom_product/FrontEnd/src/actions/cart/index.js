import * as TYPE from "../../constants/actionTypes/cart";
import { REACT_APP_BASE_ENDPOINT } from "../../App/Config/connection";
import RestClient from "../../utilities/RestClient";
import message from "../../constants/messages";

export const addToCart = (data) => ({ type: TYPE.ADD_TO_CART, data: data });
export const removeFromCart = (data) => ({
  type: TYPE.REMOVE_CART,
  data: data,
});
export const deleteAllcart = () => ({ type: TYPE.DELETE_ALL_CART });
export const addInSaveForLater = (data) => ({
  type: TYPE.ADD_IN_SAVE_FOR_LATER,
  data: data,
});
export const removeFromSaveLater = (data) => ({
  type: TYPE.REMOVE_SAVE_FOR_LATER,
  data: data,
});
export const getCart = (data) => ({ type: TYPE.GET_CART, data: data });
export const updateCart = (data) => ({ type: TYPE.UPDATE_TO_CART, data: data });

export const addToCartService = (params, cb) => {
  return (dispatch) => {
    RestClient.postFormData(`${REACT_APP_BASE_ENDPOINT}/cart/add`, params)
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
            type: message.success,
            data: result.data.data,
          };
          cb(res);
        } else {
          let res = {
            status: false,
            message: result.message,
            type: message.error,
          };

          cb(res);
        }
      })
      .catch((error) => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error,
        };
        cb(res);
      });
  };
};

/******** action creator to delete item from cart **********/
export const removeFromCartService = (params, cb) => {
  return (dispatch) => {
    RestClient.put(`${REACT_APP_BASE_ENDPOINT}/cart/remove`, params)
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.message,
            type: message.success,
          };
          cb(res);
        }
      })
      .catch((error) => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error,
        };
        cb(res);
      });
  };
};

/******** action creator to get cart **********/
export const getCartService = (params, cb) => {
  return (dispatch) => {
    RestClient.get(`${REACT_APP_BASE_ENDPOINT}/cart/get`, params)
      .then((result) => {
        if (result.status === 200) {
          dispatch(getCart(result.data.data));
          let res = {
            status: true,
            message: result.data.message,
            type: message.success,
            data: result.data.data,
          };
          cb(res);
        }
      })
      .catch((error) => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error,
        };
        cb(res);
      });
  };
};

export const makePaymentService = (params, cb) => {
  params.product_id = "20";
  return (dispatch) => {
    RestClient.post(`${REACT_APP_BASE_ENDPOINT}/payment/make-payment`, params)
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
            type: message.success,
            data: result.data.data,
          };
          cb(res);
        } else {
          let res = {
            status: false,
            message: result.message,
            type: message.error,
          };

          cb(res);
        }
      })
      .catch((error) => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error,
        };
        cb(res);
      });
  };
};

/******** action creator to update item in cart **********/
export const updateCartService = (params, cb) => {
  return (dispatch) => {
    RestClient.postFormData(`${REACT_APP_BASE_ENDPOINT}/cart/update`, params)
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.message,
            type: message.success,
          };
          cb(res);
        } else {
          let res = {
            status: false,
            message: result.message,
            type: message.error,
          };
          cb(res);
        }
      })
      .catch((error) => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error,
        };
        cb(res);
      });
  };
};

/************* Action re-order add to cart *************/
export const reorderAddToCartService = (params, cb) => {
  return (dispatch) => {
    RestClient.postFormData(
      `${REACT_APP_BASE_ENDPOINT}/cart/reorder-add`,
      params
    )
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
            type: message.success,
            data: result.data.data,
          };
          cb(res);
        } else {
          let res = {
            status: false,
            message: result.message,
            type: message.error,
          };

          cb(res);
        }
      })
      .catch((error) => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error,
        };
        cb(res);
      });
  };
};


export const changeColors = (params, cb) => {
  return (dispatch) => {
    RestClient.postFormData(`${REACT_APP_BASE_ENDPOINT}/products/testImage`, params)
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
            type: message.success,
            data: result.data.data,
          };
          cb(res);
        } else {
          let res = {
            status: false,
            message: result.message,
            type: message.error,
          };

          cb(res);
        }
      })
      .catch((error) => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error,
        };
        cb(res);
      });
  };
};
