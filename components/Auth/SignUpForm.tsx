'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../Global/TextField';

const formSchema = z.object({
	fullName: z.string().min(2).max(50),
	emailAddress: z.string().min(2).max(50),
	password: z.string().min(2).max(50),
	repeatPassword: z.string().min(2).max(50),
});

const SignUpForm = () => {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			emailAddress: '',
			password: '',
			repeatPassword: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<div className="flex flex-col w-full max-w-md gap-4">
			<div className="flex flex-col">
				<span className="text-2xl ">Registration</span>
				<span className="text-sm">Fill in all fields.</span>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<TextField
						placeholder="Enter you Fullname"
						label="Fullname"
						form={form.control}
						name="fullName"
						type="text"
					/>
					<TextField
						placeholder="Enter you email address"
						label="Email Address"
						form={form.control}
						name="emailAddress"
						type="email"
					/>
					<TextField
						placeholder="Enter you email password"
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
					<Button type="submit" className="w-full">
						Submit
					</Button>
				</form>
			</Form>
			<span>
				Already registered?{' '}
				<Link
					href="/auth/signin"
					className="text-red-400 hover:opacity-70 duration-200"
				>
					Click here
				</Link>{' '}
				to sign-in
			</span>
		</div>
	);
};

export default SignUpForm;
