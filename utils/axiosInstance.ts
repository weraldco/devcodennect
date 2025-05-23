import axios from 'axios';
import dotenv from 'dotenv';
// import { BASE_URL } from './apiPaths';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASEURL;

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		// Get the token to localStorage
		const accessToken = localStorage.getItem('token');

		//Check if token is in localStorage if yes assign the token to the header authorization
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		// Return the config variable
		return config;
	},

	// If config fails, return error
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Handle common errors globally
		if (error.response) {
			if (error.response.status === 401) {
				// Redirect to login page
				window.location.href = '/login';
			} else if (error.response.status === 500) {
				console.error('Server error. Please try again later.');
			}
		} else if (error.code === 'ECONNABORTED') {
			console.log('Request timeout. Please try again.');
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
