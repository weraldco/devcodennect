import { memo } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface Props<T extends FieldValues> {
	form: Control<T>;
	label: string;
	placeholder: string;
	description?: string;
	type: string;
	name: Path<T>;
}

const TextField = <T extends FieldValues>({
	form,
	placeholder,
	label,
	description,
	type,
	name,
}: Props<T>) => {
	return (
		<FormField
			control={form}
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
