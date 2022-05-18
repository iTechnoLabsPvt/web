/*
 * @file: connection.js
 * @description: File contains configured variables.
 * @date: 03.09.2020
 * @author: Megha Sethi
 */

if (process.env.NODE_ENV === "production") {
	module.exports = {
		REACT_APP_BASE_ENDPOINT: "https://backend.voxcatalog.com/api/v1",
		production_time: "6-10 business days after artwork approval",
	};
} else {
	module.exports = {
		// REACT_APP_BASE_ENDPOINT: "https://backend.voxcatalog.com/api/v1",
		REACT_APP_BASE_ENDPOINT: "http://localhost:3014/api/v1",
		production_time: "6-10 business days after artwork approval",
	};
}
