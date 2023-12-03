import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
	if (localStorage.getItem("token")) {
		req.headers.authorization = localStorage.getItem("token");
	}
	return req;
});
