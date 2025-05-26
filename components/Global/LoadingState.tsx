import { AiOutlineLoading } from 'react-icons/ai';
import { FaRegCircle } from 'react-icons/fa6';

interface LoadingProps {
	label?: String;
}

const LoadingState = ({ label }: LoadingProps) => {
	return (
		<div className="flex flex-row items-center gap-2">
			<div className="relative text-gray-300 ">
				<FaRegCircle size={32}></FaRegCircle>
				<div className="absolute top-0 text-gray-600 animate-spin">
					<AiOutlineLoading size={32}></AiOutlineLoading>
				</div>
			</div>
			<span className="text-neutral-500 text-sm">{`Loading ${
				label ? label : ''
			}..`}</span>
		</div>
	);
};

export default LoadingState;
