'use client';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';

const LogoutBtn = () => {
	const router = useRouter();
	const handleLogout = async () => {
		const response = await axiosInstance.post(API_PATHS.AUTH.SIGNOUT);
		if (response.statusText == 'OK') {
			router.push('/auth/signin');
		}
	};

	return (
		<button
			className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300/50 active:bg-neutral-300 duration-200 rounded-lg "
			onClick={() => handleLogout()}
		>
			Logout
		</button>
	);
};

export default LogoutBtn;
