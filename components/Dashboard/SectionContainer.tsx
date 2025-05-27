import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
	className?: String;
}

const SectionContainer: FC<Props> = ({ children, className }) => {
	return (
		<div className={`${className} bg-neutral-100/70 p-4 rounded`}>
			{children}
		</div>
	);
};

export default SectionContainer;
