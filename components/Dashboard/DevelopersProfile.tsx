'use client';
import { useUserAuth } from '@/hooks/useUserAuth';
import { useAuthStore } from '@/store/authStore';
import { FC } from 'react';
import LoadingState from '../Global/LoadingState';

interface Props {}

const DevelopersProfile: FC<Props> = () => {
	useUserAuth();
	const { user } = useAuthStore();

	return (
		<div>
			{!user ? (
				<div className="w-full h-screen">
					<LoadingState />;
				</div>
			) : (
				<div>{user.fullName}</div>
			)}
		</div>
	);
};

export default DevelopersProfile;
