import { FC } from 'react';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface Props {
	form: any;
	label: string;
	placeholder: string;
	description?: string;
	type: string;
	name: string;
}

const TextField: FC<Props> = ({
	form,
	placeholder,
	label,
	description,
	type,
	name,
}) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="text-neutral-400 ">{label}</FormLabel>
					<FormControl className="">
						<Input
							placeholder={placeholder}
							{...field}
							type={type}
							className="md:text-base  py-5"
						/>
					</FormControl>
					<FormDescription>{description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default TextField;
