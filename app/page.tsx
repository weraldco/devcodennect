'use client';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export default function Home() {
	const { user, fetchUserData } = useAuthStore();
	useEffect(() => {
		fetchUserData();
	}, []);
	console.log('user', user);

	if (!user) return <div>Loading...</div>;
	return (
		<div className=" w-full flex items-center justify-center">Dashboard </div>
	);
}
