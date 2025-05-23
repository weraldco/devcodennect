'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../Global/TextField';

const formSchema = z.object({
	email: z.string().min(2).max(50),
	password: z.string().min(2).max(50),
});

interface Props {}

const SignInForm: FC<Props> = () => {
	// 1. Define your form.
	const { user, setUser } = useAuthStore();
	const [error, setError] = useState('');

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setError('');
		try {
			const { email, password } = values;
			const response = await axiosInstance.post(API_PATHS.AUTH.SIGNIN, {
				email,
				password,
			});
			const { user, token } = response.data;

			if (token) {
				localStorage.setItem('token', token);
				// setUser(user);
			}
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				setError(error.response.data.message);
			} else {
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

					<Button type="submit" className="w-full py-5">
						Submit
					</Button>
				</form>
			</Form>
			<span>
				Not yet registered?{' '}
				<Link
					href="/auth/signup"
					className="text-red-400 hover:opacity-70 duration-200"
				>
					Click here
				</Link>{' '}
				to sign-up
			</span>
		</div>
	);
};

export default SignInForm;
