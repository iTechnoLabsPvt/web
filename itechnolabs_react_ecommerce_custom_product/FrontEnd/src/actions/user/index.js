import * as TYPE from "../../constants/actionTypes/user";
import { REACT_APP_BASE_ENDPOINT } from "../../App/Config/connection";
import RestClient from "../../utilities/RestClient";
import message from "../../constants/messages";

//Action Creator For Reducers

export const login_Success = (data) => ({
  type: TYPE.LOGIN_SUCCESS,
  data: data,
});
export const log_out = () => ({ type: TYPE.LOG_OUT });
export const rememberMe = (data) => ({ type: TYPE.REMEMBER_ME, data: data });

/****** action creator for login ********/
export const login = (params, cb) => {
  return (dispatch) => {
    RestClient.post(`${REACT_APP_BASE_ENDPOINT}/user/login`, params)
      .then((result) => {
        if (result.status === 200) {
          localStorage.removeItem('guestUser');
          dispatch(login_Success(result.data.data));
          let res = {
            status: true,
            message: result.data.message,
            type: message.success,
            user_id: result.data.data.id,
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

/******** action creator to log user out of the application **********/
export const logOut = (params, cb) => {
  return (dispatch) => {
    RestClient.put(`${REACT_APP_BASE_ENDPOINT}/user/logout`, {}, params.token)
      .then((result) => {
        if (result) {
          dispatch(log_out());
          let res = {
            status: true,
            message: message.logout,
            type: message.logout,
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

export const signup = (params, cb) => {
  return (dispatch) => {
    RestClient.post(`${REACT_APP_BASE_ENDPOINT}/user/register`, params)
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
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
export const verifyEmail = (params, cb) => {
  return (dispatch) => {
    RestClient.post(`${REACT_APP_BASE_ENDPOINT}/user/email-verify`, params)
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
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

export const forgetPasssword = (params, cb) => {
  return (dispatch) => {
    RestClient.post(`${REACT_APP_BASE_ENDPOINT}/user/forgot-password`, params)
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
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

export const resetPassword = (params, cb) => {
  const token = params.token;
  delete params.token;
  return (dispatch) => {
    RestClient.put(
      `${REACT_APP_BASE_ENDPOINT}/user/reset-password`,
      params,
      token
    )
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
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

export const resendVerificationEmail = (params, cb) => {
  return (dispatch) => {
    RestClient.post(`${REACT_APP_BASE_ENDPOINT}/user/resend-email`, params)
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
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

export const updateProfile = (params, cb) => {
  const token = params.token;
  delete params.token;
  return (dispatch) => {
    RestClient.put(
      `${REACT_APP_BASE_ENDPOINT}/user/profile/update`,
      params,
      token
    )
      .then((result) => {
        if (result.status === 200) {
          dispatch(login_Success(result.data.data));
          let res = {
            status: true,
            message: result.data.message,
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

export const changePassword = (params, cb) => {
  const token = params.token;
  delete params.token;
  return (dispatch) => {
    RestClient.put(
      `${REACT_APP_BASE_ENDPOINT}/user/password/change`,
      params,
      token
    )
      .then((result) => {
        if (result.status === 200) {
          let res = {
            status: true,
            message: result.data.message,
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

export const getLiveFeedsFromInstagram = (cb) => {
  return (dispatch) => {
    RestClient.get(`${REACT_APP_BASE_ENDPOINT}/user/posts/get`)
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


/**** Signup guest ***/

export const signupGuest = (params, cb) => {
  return (dispatch) => {
    RestClient.post(`${REACT_APP_BASE_ENDPOINT}/user/register-guest`, params)
      .then((result) => {
        if (result.status === 200) {
          //dispatch(login_Success(result.data.data));
          let res = {
            status: true,
            message: result.data.message,
            type: message.success,
            data:  result.data.data,
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
