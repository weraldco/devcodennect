import { FC } from 'react';

interface Props {
	className?: String;
}

const Logo: FC<Props> = ({ className }) => {
	return (
		<div className={`${className} `}>
			<span className="font-montserrat font-bold text-teal-700">dev</span>
			<span className="text-teal-600">codennect</span>
		</div>
	);
};

export default Logo;
