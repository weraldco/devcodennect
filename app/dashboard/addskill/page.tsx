'use client';

import TextField from '@/components/Global/TextField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';

import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { z } from 'zod';

const formSchema = z.object({
	// id: z.string().min(2).max(50),
	skillName: z.string().min(2).max(50),
});
export type FormValues = z.infer<typeof formSchema>;

const AddNewSkill = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			skillName: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setError('');
		setLoading(true);
		try {
			const { skillName } = values;
			const response = await axiosInstance.post(API_PATHS.AUTH.ADDNEWSKILL, {
				id: skillName.toLowerCase().replaceAll(' ', '-'),
				skillName,
			});
			if (response.data) {
				toast(response.data.message);
				setLoading(false);
				form.reset();
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
				<span className="text-xl">Add New Skill</span>
				<span className="text-sm">Add your new skill in the database?</span>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<TextField
						placeholder="Enter skill name. eg. Javascript"
						label="Skill Name"
						form={form.control}
						name="skillName"
						type="text"
					/>

					<Button className="cursor-pointer w-full bg-violet-500 hover:bg-violet-400 duration-200 active:bg-violet-600 py-6">
						{!loading ? (
							'ADD SKILL'
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

			{error && <span className="text-red-400">{error}</span>}
		</div>
	);
};

export default AddNewSkill;
