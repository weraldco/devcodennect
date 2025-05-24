'use client';
import SignUpForm from '@/components/Auth/SignUpForm';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
	const { user } = useAuthStore();
	console.log(user);
	return (
		<div className=" w-full flex items-center justify-center">Dashboard </div>
	);
}
