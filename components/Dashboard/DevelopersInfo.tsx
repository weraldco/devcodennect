import { UserType } from '@/utils/types';
import Image from 'next/image';
import { FC } from 'react';
import { MdOutlineEdit } from 'react-icons/md';

import { useAuthStore } from '@/store/authStore';
import LoadingState from '../Global/LoadingState';
import SkillIcon from '../Global/SkillIcon';
import JobSection from './JobSection';
import SectionContainer from './SectionContainer';

const DevelopersInfo = () => {
	const { user } = useAuthStore();
	if (!user || !user?.skills)
		return <LoadingState label="Profile Information.." />;
	console.log(user);
	return (
		<div className=" w-full max-w-3xl gap-4 flex flex-col	">
			<div className="flex   justify-between gap-4">
				<div>
					<div className="w-32 h-32 bg-red-50 flex items-center justify-center rounded-full">
						<Image
							src={user.imgUrl}
							width={100}
							height={100}
							alt={user.fullName}
							className="object-cover w-30 h-30 rounded-full object-top"
						/>
					</div>
					<div>
						<div className="font-bold text-2xl">{user.fullName}</div>
						<div>{user.email}</div>
					</div>
				</div>
				<div>
					<button className="flex flex-row gap-2 items-center px-4 py-2 bg-neutral-100 rounded hover:opacity-80 active:opacity-50 duration-200">
						<MdOutlineEdit size={22} />{' '}
						<span className="text-sm">Edit Profile</span>
					</button>
				</div>
			</div>

			<SectionContainer className="flex flex-col gap-2">
				<span className="font-bold"> About</span> <div>{user.about}</div>
			</SectionContainer>
			<SectionContainer>
				<JobSection job={user.job} />
			</SectionContainer>
			{user.skills && (
				<SectionContainer className="gap-2 flex flex-col">
					<span className="font-bold"> Skills</span>
					<div className="flex gap-4">
						{user.skills.map((skill) => (
							<div key={skill.id}>
								<div className="flex flex-col items-center gap-2">
									<div className="bg-neutral-700 text-white p-3 rounded-full flex items-center justify-center">
										<SkillIcon id={skill.id} />
									</div>
									<span className="text-sm">{skill.skillName}</span>
								</div>
							</div>
						))}
					</div>
				</SectionContainer>
			)}
		</div>
	);
};

export default DevelopersInfo;
