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
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../Global/TextField';

const formSchema = z.object({
	emailAddress: z.string().min(2).max(50),
	password: z.string().min(2).max(50),
});

interface Props {}

const SignInForm: FC<Props> = () => {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			emailAddress: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
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

					<Button type="submit" className="w-full py-5">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default SignInForm;
