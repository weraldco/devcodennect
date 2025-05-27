'use client';
import { useUserAuth } from '@/hooks/useUserAuth';
import { useAuthStore } from '@/store/authStore';
import { FC } from 'react';
import LoadingState from '../Global/LoadingState';
import Navbar from '../Navbar/Navbar';
import DevelopersInfo from './DevelopersInfo';

interface Props {}

const DevelopersProfile: FC<Props> = () => {
	useUserAuth();
	const { user } = useAuthStore();

	return (
		<div className="w-full">
			<Navbar />

			<div className=" flex h-screen w-full items-center justify-center ">
				<div className="w-full h-screen flex  justify-center ">
					{!user ? (
						<LoadingState label="Profile Information.." />
					) : (
						<DevelopersInfo user={user} />
					)}
				</div>
			</div>
		</div>
	);
};

export default DevelopersProfile;
