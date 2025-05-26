import { UserType } from '@/utils/types';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
	user: UserType;
}

const DevelopersInfo: FC<Props> = ({ user }) => {
	return (
		<div className=" w-full max-w-3xl">
			<div className="w-40 h-40 rounded-full">
				<Image
					src={user.imgUrl}
					width={100}
					height={100}
					alt={user.fullName}
					className="object-cover w-40 h-40 rounded-full object-top"
				/>
			</div>
			<div>{user.fullName}</div>
			<div>{user.email}</div>
			<div>{user.about}</div>
			<div>
				{user.job.length != 0 &&
					user.job.map((job) => <div key={job.id}>{job.name}</div>)}
			</div>
			<div>
				{user.skills.map((skill) => (
					<div key={skill.id}>{skill.skillName}</div>
				))}
			</div>
		</div>
	);
};

export default DevelopersInfo;
