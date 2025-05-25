'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAuthStore } from '@/store/authStore';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { z } from 'zod';
import TextField from '../Global/TextField';

const formSchema = z.object({
	email: z.string().min(2).max(50),
	password: z.string().min(2).max(50),
});
export type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
	// 1. Define your form.
	const { user, setUser } = useAuthStore();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setError('');
		setLoading(true);
		try {
			const { email, password } = values;
			const response = await axiosInstance.post(API_PATHS.AUTH.SIGNIN, {
				email,
				password,
			});

			if (response.data) {
				const { user } = response.data;
				setUser(user);
				router.push('/');
				setLoading(false);
			}
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				setLoading(false);
				setError(error.response.data.message);
			} else {
				setLoading(false);
				setError('Something went wrong, try again later.');
			}
		}
	};
	return (
		<div className="flex flex-col w-full  max-w-md gap-4">
			<div className="flex flex-col">
				<span className="text-2xl">Welcome back</span>
				<span className="text-sm">
					To access your dashboard, you need to sign-in
				</span>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<TextField
						placeholder="Enter you email address"
						label="Email Address"
						form={form.control}
						name="email"
						type="email"
					/>
					<TextField
						placeholder="Enter you email password"
						label="Password"
						form={form.control}
						name="password"
						type="password"
					/>

					<Button className="cursor-pointer w-full bg-violet-500 hover:bg-violet-400 duration-200 active:bg-violet-600 py-6">
						{!loading ? (
							'LOGIN'
						) : (
							<div className=" px-4 py-2 flex gap-2 items-center">
								<div className="animate-spin">
									<AiOutlineLoading3Quarters />
								</div>
								<span>Processing..</span>
							</div>
						)}
					</Button>
				</form>
			</Form>
			<span>
				Not yet registered?{' '}
				<Link
					href="/auth/signup"
					className="text-teal-400 hover:opacity-70 duration-200"
				>
					Click here
				</Link>{' '}
				to sign-up
			</span>
			{error && <span className="text-red-400">{error}</span>}
		</div>
	);
};

export default SignInForm;
