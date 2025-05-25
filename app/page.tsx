'use server';

import Dashboard from '@/components/Dashboard/Dashboard';
import LogoutBtn from '@/components/LogoutBtn';
import { useAuthStore } from '@/store/authStore';

export default async function Home() {
	return (
		<div className=" w-full flex items-center justify-center">
			<Dashboard />
		</div>
	);
}
