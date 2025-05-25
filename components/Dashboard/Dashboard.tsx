'use client';
import { useUserAuth } from '@/hooks/useUserAuth';
import { useAuthStore } from '@/store/authStore';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { FC, useEffect } from 'react';
import LogoutBtn from '../LogoutBtn';

const Dashboard = () => {
	useUserAuth();
	const { user } = useAuthStore();

	if (!user) return <div>Loading..</div>;

	return (
		<div>
			Welcome back, {user?.fullName}
			<LogoutBtn />
		</div>
	);
};

export default Dashboard;
