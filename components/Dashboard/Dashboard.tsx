'use client';
import { useAuthStore } from '@/store/authStore';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { FC, useEffect } from 'react';
import LogoutBtn from '../LogoutBtn';

const Dashboard = () => {
	const { user, fetchUserData } = useAuthStore();
	useEffect(() => {
		fetchUserData();
	}, []);
	if (!user) return <div>Loading..</div>;
	// console.log(user.user.username);
	console.log(user.fullName);

	return (
		<div>
			Welcome back, {user?.fullName}
			<LogoutBtn />
		</div>
	);
};

export default Dashboard;
