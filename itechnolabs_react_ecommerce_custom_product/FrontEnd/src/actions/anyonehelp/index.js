// import * as TYPE from '../../constants/actionTypes/categories';
import { REACT_APP_BASE_ENDPOINT } from "../../App/Config/connection";
import RestClient from "../../utilities/RestClient";
import message from "../../constants/messages";

/****** action creator for login ********/
export const getHelp = (cb) => {
	return (dispatch) => {
		RestClient.get(`${REACT_APP_BASE_ENDPOINT}/help/get`)
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
