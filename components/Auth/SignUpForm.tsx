'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaRegCircle } from 'react-icons/fa6';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/store/authStore';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingState from '../Global/LoadingState';
import TextField from '../Global/TextField';

// const skills = [
// 	{
// 		id: 'html',
// 		label: 'HTML',
// 	},
// 	{
// 		id: 'css',
// 		label: 'CSS',
// 	},
// 	{
// 		id: 'javascript',
// 		label: 'Javascript',
// 	},
// 	{
// 		id: 'java',
// 		label: 'Java',
// 	},
// 	{
// 		id: 'python',
// 		label: 'Python',
// 	},
// 	{
// 		id: 'c#',
// 		label: 'C#',
// 	},
// 	{
// 		id: 'c++',
// 		label: 'C++',
// 	},
// 	{
// 		id: 'typescript',
// 		label: 'Typescript',
// 	},
// 	{
// 		id: 'go',
// 		label: 'Go',
// 	},
// 	{
// 		id: 'ruby',
// 		label: 'Ruby',
// 	},
// 	{
// 		id: 'c-lang',
// 		label: 'C Lang',
// 	},
// 	{
// 		id: 'php',
// 		label: 'PHP',
// 	},
// ] as const;

const formSchema = z.object({
	fullName: z.string().min(2).max(50),
	username: z.string().min(8).max(50),
	email: z.string().min(2).max(50),
	password: z.string().min(2).max(50),
	repeatPassword: z.string().min(2).max(50),
	about: z
		.string()
		.min(10, { message: 'About you must be 10 character long.' })
		.max(100),
	skills: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'You have to select at least one item.',
	}),
	job: z.object({
		name: z.string(),
		position: z.string(),
		role: z.string(),
	}),
});

const SignUpForm = () => {
	const { fetchSkills, skills } = useAuthStore();
	useEffect(() => {
		fetchSkills();
	}, []);

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			username: '',
			email: '',
			password: '',
			repeatPassword: '',
			about: '',
			skills: [],
			job: {
				name: '',
				position: '',
				role: '',
			},
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		setError(null);
		if (values.password !== values.repeatPassword) {
			setError("Password didn't match!");
			setLoading(false);
		}

		try {
			const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, values);
			setLoading(false);
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				setLoading(false);
				setError(error.response.data.message);
			} else {
				setLoading(false);
				setError('Something went wrong, try again later.');
			}
		}
	}

	return (
		<div className="flex flex-col w-full max-w-3xl gap-4">
			<div>
				<span>dev</span>
				<span>Codennect</span>
			</div>
			<div className="flex flex-col">
				<span className="text-2xl ">Registration</span>
				<span className="text-sm">Fill in all fields.</span>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4  ">
					<div className="grid grid-cols-2 gap-10">
						<div className="flex flex-col gap-4">
							<TextField
								placeholder="Enter your Fullname"
								label="Fullname"
								form={form.control}
								name="fullName"
								type="text"
							/>
							<TextField
								placeholder="Enter your username"
								label="Useraname"
								form={form.control}
								name="username"
								type="text"
							/>
							<TextField
								placeholder="Enter your email address"
								label="Email Address"
								form={form.control}
								name="email"
								type="email"
							/>
							<TextField
								placeholder="Enter your password"
								label="Password"
								form={form.control}
								name="password"
								type="password"
							/>
							<TextField
								placeholder="Repeat your password"
								label="Repeat Password"
								form={form.control}
								name="repeatPassword"
								type="password"
							/>
							<FormField
								control={form.control}
								name="about"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-neutral-400">About</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Tell us a little bit about yourself"
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex flex-col gap-4">
							{skills ? (
								<FormField
									control={form.control}
									name="skills"
									render={() => (
										<FormItem>
											<div className="mb-4">
												<FormLabel className="text-base">Your Skills</FormLabel>
											</div>

											<div className="grid grid-cols-3 gap-3">
												{skills.map((skill) => (
													<FormField
														key={skill.id}
														control={form.control}
														name="skills"
														render={({ field }) => {
															return (
																<FormItem
																	key={skill.id}
																	className="flex flex-row items-start space-x-3 space-y-0"
																>
																	<FormControl>
																		<Checkbox
																			checked={field.value?.includes(skill.id)}
																			onCheckedChange={(checked) => {
																				return checked
																					? field.onChange([
																							...field.value,
																							skill.id,
																					  ])
																					: field.onChange(
																							field.value?.filter(
																								(value) => value !== skill.id
																							)
																					  );
																			}}
																		/>
																	</FormControl>
																	<FormLabel className="font-normal">
																		{skill.skillName}
																	</FormLabel>
																</FormItem>
															);
														}}
													/>
												))}
											</div>

											<FormMessage />
										</FormItem>
									)}
								/>
							) : (
								<LoadingState label="Skills List.." />
							)}

							<div>Job</div>
							<div>
								<TextField
									placeholder="Enter your Company Name.."
									label="Company"
									form={form.control}
									name="job.name"
									type="text"
								/>
								<TextField
									placeholder="Enter your position in company.."
									label="Position"
									form={form.control}
									name="job.position"
									type="text"
								/>
								<FormField
									control={form.control}
									name="job.role"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-neutral-400">Role</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Tell us about your role in that position.."
													className="resize-none"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</div>
					<div className=" w-full">
						<Button type="submit" className="w-full ">
							{loading ? <LoadingState></LoadingState> : 'SIGN-UP'}
						</Button>
					</div>
				</form>
			</Form>
			<span>
				Already registered?{' '}
				<Link
					href="/auth/signin"
					className="text-teal-400 hover:opacity-70 duration-200"
				>
					Click here
				</Link>{' '}
				to sign-in
			</span>
			{error && <span className="text-red-400">{error}</span>}
		</div>
	);
};

export default SignUpForm;
