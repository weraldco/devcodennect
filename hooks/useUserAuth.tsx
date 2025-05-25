import { useAuthStore } from '@/store/authStore';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useUserAuth = () => {
	const { user, setUser, clearUser } = useAuthStore();
	const router = useRouter();
	useEffect(() => {
		if (user) return;
		let isMounted = true;

		const fetchUserData = async () => {
			try {
				const response = await axiosInstance.get(API_PATHS.AUTH.GETUSERINFO);

				if (isMounted && response.data) {
					setUser(response.data.user);
				}
			} catch (error) {
				console.error('Failed to fetch data', error);
				if (isMounted) {
					clearUser();
					router.push('/');
				}
			}
		};

		fetchUserData();

		return () => {
			isMounted = false;
		};
	}, [user, setUser, clearUser]);
};
