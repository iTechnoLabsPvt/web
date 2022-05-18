import * as TYPE from "../../constants/actionTypes/products";
import { REACT_APP_BASE_ENDPOINT } from "../../App/Config/connection";
import RestClient from "../../utilities/RestClient";
import message from "../../constants/messages";

export const addProducts = (data) => ({ type: TYPE.ADD_PRODUCTS, data: data });
export const addProductDetail = (data) => ({
	type: TYPE.ADD_PRODUCT_DETAIL,
	data: data,
});

/****** action creator for login ********/
export const getProducts = (params, cb) => {
	const token = params.token;
	delete params.token;
	return (dispatch) => {
		RestClient.get(`${REACT_APP_BASE_ENDPOINT}/products/get`, params, token)
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

/****** action creator for product detail ********/
export const getProductDetail = (params, cb) => {
	return (dispatch) => {
		RestClient.get(`${REACT_APP_BASE_ENDPOINT}/products/detail/get`, params)
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

/****** action creator for get similar products ********/
export const getSimilarProducts = (params, cb) => {
	return (dispatch) => {
		RestClient.post(`${REACT_APP_BASE_ENDPOINT}/products/similar`, params)
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

/****** action creator for product detail by style color size ********/
export const getProductInfoByStyleColorSize = (params, cb) => {
	return (dispatch) => {
		RestClient.get(
			`${REACT_APP_BASE_ENDPOINT}/products/detail/get/style-color-size`,
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

export const shareDesign = (params, cb) => {
	return (dispatch) => {
		RestClient.post(
			`${REACT_APP_BASE_ENDPOINT}/mockup/send-mockup-email`,
			params
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

/****** action creator for get edit product detail from database ********/
export const getEditProductDetail = (params, cb) => {
	return (dispatch) => {
		RestClient.get(`${REACT_APP_BASE_ENDPOINT}/products/edit-detail`, params)
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

/****** action creator for check details products ********/
export const checkProductDetails = (params, cb) => {
	return (dispatch) => {
		RestClient.post(`${REACT_APP_BASE_ENDPOINT}/products/check-details`, params)
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

/****** action creator for product detail by style color size from DB ********/
export const getProductByColorSizeStyleFromDB = (params, cb) => {
	return (dispatch) => {
		RestClient.get(
			`${REACT_APP_BASE_ENDPOINT}/products/detail/get/product-style-color-size`,
			params
		)
			.then((result) => {
				console.log("result =>", result);
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
