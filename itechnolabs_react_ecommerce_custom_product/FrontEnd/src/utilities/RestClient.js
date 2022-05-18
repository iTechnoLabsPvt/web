import querystring from "querystring";
import axios from "axios";

/******** Set Authorization token in header ***********/
export const setAuthorizationToken = (axios, token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

var config = {
  headers: { "Content-Type": "application/json" },
};

class RestClient {
  static post(url, params, token = "") {
    config = { headers: { "Content-Type": "application/json" } };
    setAuthorizationToken(axios, token);
    return new Promise(function (fulfill, reject) {
      axios
        .post(url, JSON.stringify(params), config)
        .then(function (response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static put(url, params, token = "") {
    config = { headers: { "Content-Type": "application/json" } };
    setAuthorizationToken(axios, token);
    return new Promise(function (fulfill, reject) {
      axios
        .put(url, JSON.stringify(params), config)
        .then(function (response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static delete(url, token = "") {
    config = { headers: { "Content-Type": "application/json" } };
    setAuthorizationToken(axios, token);
    return new Promise(function (fulfill, reject) {
      axios
        .delete(url, config)
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  static get(url, params, token = "") {
    config = { headers: { "Content-Type": "application/json" } };
    let query = querystring.stringify(params);
    setAuthorizationToken(axios, token);
    return new Promise(function (fulfill, reject) {
      axios
        .get(url + "?" + query, config)

        .then(function (response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }

  /*************** Form-Data Method ***********/
  static postFormData(url, params, token = "") {
    setAuthorizationToken(axios, token);
    config.headers["Content-Type"] = "multipart/form-data";
    return new Promise(function (fulfill, reject) {
      // var body = new FormData();
      // body.append('attachment', params);
      axios
        .post(url, params, config, token)

        .then(function (response) {
          fulfill({ status: response.status, data: response.data });
        })
        .catch(function (error) {
          if (error && error.response) {
            fulfill(error.response.data);
          } else {
            reject(error);
          }
        });
    });
  }
}

export default RestClient;
