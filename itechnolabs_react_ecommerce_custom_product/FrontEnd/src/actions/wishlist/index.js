import { REACT_APP_BASE_ENDPOINT } from '../../App/Config/connection';
import RestClient from '../../utilities/RestClient';
import message from '../../constants/messages';
import _ from 'underscore';

export const addToWishlistService = (params, cb) => {
    const token = params.token;
    delete params.token;
    return dispatch => {
      RestClient.post(`${REACT_APP_BASE_ENDPOINT}/wishlist/add`, params, token)
        .then(result => {
          if (result.status === 200) {
            let res = {
              status: true,
              message: result.data.message,
              type: message.success,
              data: result.data.data
            };
            cb(res);
          } else {
            let res = {
              status: false,
              message: result.message,
              type: message.error
            };
  
            cb(res);
          }
        })
        .catch(error => {
          let res = {
            status: false,
            message: message.commonError,
            type: message.error
          };
          cb(res);
        });
    };
  };

  /******** action creator to delete item from wishlist **********/
  export const removeFromWishlistService = (params, cb) => {
    const token = params.token;
    delete params.token;
    return dispatch => {
      RestClient.put(`${REACT_APP_BASE_ENDPOINT}/wishlist/remove`, params, token)
        .then(result => {
          if (result.status === 200) {
            let res = {
              status: true,
              message: result.message,
              type: message.success
            };
            cb(res);
          }
        })
        .catch(error => {
          let res = {
            status: false,
            message: message.commonError,
            type: message.error
          };
          cb(res);
        });
    };
  };

  /******** action creator to get wishlist **********/
export const getWishlistService = (params, cb) => {
const token = params.token;
delete params.token;
  return dispatch => {
    RestClient.get(`${REACT_APP_BASE_ENDPOINT}/wishlist/get`, params, token)
      .then(result => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
            type: message.success,
            data: result.data.data
          };
          cb(res);
        }
      })
      .catch(error => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error
        };
        cb(res);
      });
    };
  };

  export const saveMockup = (params, cb) => {
    const token = params.token;
    delete params.token;
    let body = new FormData();
    _.mapObject(params, (obj, key)=>{
      if(key == 'customized_product_details' || key == 'sizes_quantity' || key == 'color_size_arr'){
         body.append(key, JSON.stringify(obj) );
      }else{
         body.append(key, obj );
      }
      return;
   })
    return (dispatch) => {
      RestClient.postFormData(`${REACT_APP_BASE_ENDPOINT}/mockup/save`, body, token)
        .then((result) => {
          if (result.status === 200) {
            let res = {
              status: true,
              message: result.data.message,
              type: message.success
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

   /******** action creator to delete item from mockups **********/
   export const removeMockupService = (params, cb) => {
    const token = params.token;
    delete params.token;
    return dispatch => {
      RestClient.put(`${REACT_APP_BASE_ENDPOINT}/mockup/remove`, params, token)
        .then(result => {
          if (result.status === 200) {
            let res = {
              status: true,
              message: result.message,
              type: message.success
            };
            cb(res);
          }
        })
        .catch(error => {
          let res = {
            status: false,
            message: message.commonError,
            type: message.error
          };
          cb(res);
        });
    };
  };

  /******** action creator to get mockups **********/
export const getMockupsService = (params, cb) => {
const token = params.token;
delete params.token;
  return dispatch => {
    RestClient.get(`${REACT_APP_BASE_ENDPOINT}/mockup/get`, params, token)
      .then(result => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
            type: message.success,
            data: result.data.data
          };
          cb(res);
        }
      })
      .catch(error => {
        let res = {
          status: false,
          message: message.commonError,
          type: message.error
        };
        cb(res);
      });
    };
  };