import axios from "axios";

axios.interceptors.request.use((config) => {
	if (!config.headers.common) {
		config.headers.common = {};
	}
	config.headers.common["Content-type"] = "application/json; charset=UTF-8";
	return config;
});

axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			console.error("API Response Error:", error.response);
		} else if (error.request) {
			console.error("API Request Error:", error.request);
		} else {
			console.error("API Error:", error.message);
		}
		throw error;
	},
);
