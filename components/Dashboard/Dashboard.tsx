'use client';
import { useUserAuth } from '@/hooks/useUserAuth';
import { useAuthStore } from '@/store/authStore';
import LoadingState from '../Global/LoadingState';
import LogoutBtn from '../LogoutBtn';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
	useUserAuth();
	const { user } = useAuthStore();

	if (!user) return <LoadingState />;

	return (
		<div className="w-full relative">
			<Navbar />
			Welcome back, {user?.fullName}
			<LogoutBtn />
		</div>
	);
};

export default Dashboard;
