'use server';

import Dashboard from '@/components/Dashboard/Dashboard';

export default async function Home() {
	return (
		<div className=" w-full flex items-center justify-center">
			<Dashboard />
		</div>
	);
}
