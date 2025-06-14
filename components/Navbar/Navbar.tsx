import Link from 'next/link';
import { FC } from 'react';
import LogoutBtn from '../LogoutBtn';

interface Props {}

const Navbar: FC<Props> = () => {
	return (
		<div className="bg-neutral-100 w-full sticky top-0 h-18 flex items-center justify-between px-3">
			<Link href="/">
				<div className="text-xl font-bold">DevCodennect</div>
			</Link>
			<div>
				<div className="flex gap-4">
					<Link
						href="/dashboard/profile"
						className="bg-neutral-200 px-4 py-2 rounded-lg"
					>
						Profile
					</Link>
					<Link
						href="/dashboard/addSkill"
						className="bg-neutral-200 px-4 py-2 rounded-lg"
					>
						Add skill
					</Link>
					<LogoutBtn />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
