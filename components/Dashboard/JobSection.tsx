import { JobType } from '@/utils/types';
import { FC } from 'react';
interface Props {
	job: JobType[] | null;
}

const JobSection: FC<Props> = ({ job }) => {
	return (
		<div>
			<span className="font-bold">Jobs</span>
			{job?.map((j) => (
				<div key={j.id}>
					<div>
						<span>Company name: </span>
						<span>{j.name}</span>
					</div>
					<div>
						<span>Position </span>
						<span>{j.position}</span>
					</div>
					<div>
						<span>Role </span>
						<span>{j.role}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default JobSection;
