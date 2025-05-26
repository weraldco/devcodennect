import { FC } from 'react';
import LogoutBtn from '../LogoutBtn';

interface Props {}

const Navbar: FC<Props> = () => {
	return (
		<div className="bg-neutral-100 w-full sticky top-0 h-18 flex items-center justify-between px-3">
			<div className="text-xl font-bold">DevCodennect</div>
			<div>
				<div>
					<LogoutBtn />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
