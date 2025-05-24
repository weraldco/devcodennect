'use server';
import { useAuthStore } from '@/store/authStore';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { UserType } from '@/utils/types';
import { redirect } from 'next/navigation';

type loginValuesType = {
	email: string;
	password: string;
};
export const loginAction = async (values: loginValuesType) => {
	try {
		const { email, password } = values;
		const response = await axiosInstance.post(API_PATHS.AUTH.SIGNIN, {
			email,
			password,
		});
		console.log('res', response);

		const { user, token } = response.data;

		if (token) {
			localStorage.setItem('token', token);
			// setUser(user);
			return user;
			// redirect('/');
		}
	} catch (error: any) {
		if (error.response && error.response.data.message) {
			return error.response.data.message;
		} else {
			return 'Something went wrong, try again later.';
		}
	}
};
