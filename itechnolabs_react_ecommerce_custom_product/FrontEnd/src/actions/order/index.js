import * as TYPE from "../../constants/actionTypes/order";
import { REACT_APP_BASE_ENDPOINT } from "../../App/Config/connection";
import RestClient from "../../utilities/RestClient";
import message from "../../constants/messages";

export const getShipmentRate = (data) => ({
  type: TYPE.GET_SHIPMENT_RATE,
  data: data,
});

export const getShipmentRateService = (params, cb) => {
  return (dispatch) => {
    RestClient.post(`${REACT_APP_BASE_ENDPOINT}/order/get-order-rating`, params)
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

export const orderPlacewithShipment = (params, cb) => {
  return (dispatch) => {
    RestClient.post(`${REACT_APP_BASE_ENDPOINT}/order/place-order`, params)
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

/******** action creator to get order list **********/
export const getOrderListService = (params, cb) => {
  return (dispatch) => {
    RestClient.get(`${REACT_APP_BASE_ENDPOINT}/order/get-order-list`, params)
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

/******** action creator to get order item list **********/
export const getOrderItemListService = (params, cb) => {
  return (dispatch) => {
    RestClient.get(`${REACT_APP_BASE_ENDPOINT}/order/get-order-items`, params)
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

/***** Action creator list to get order detail ******/

export const getOrderDetailService = (params, cb) => {
  return (dispatch) => {
    RestClient.get(`${REACT_APP_BASE_ENDPOINT}/order/get-order-detail`, params)
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