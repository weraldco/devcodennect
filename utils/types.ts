export type UserType = {
	id: number;
	username: string;
	email: string;
	password: string;
	fullName: string;
	imgUrl: string;
	about: string;
	job: JobType[];
	skills: SkillType[];
	posts: PostType[];
};

export type JobType = {
	id: number;
	name: string;
	position: string;
	role: string;
};

export type SkillType = {
	id: number;
	skillName: string;
};

export type PostType = {
	id: number;
	title: string;
	content: string;
	published: boolean;
	authorId: number;
};
