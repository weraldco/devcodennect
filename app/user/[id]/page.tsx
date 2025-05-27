'use client';
import { useUserStore } from '@/store/userStore';
import { FC, use, useEffect } from 'react';

interface Props {
	params: Promise<{ id: number }>;
}

const page: FC<Props> = ({ params }) => {
	const { user, fetchUser } = useUserStore();
	const id = use(params).id;
	useEffect(() => {
		fetchUser(id);
	}, []);

	if (!user) return <div>Loading</div>;
	console.log(user);
	return <div>{user.fullName}</div>;
};

export default page;
