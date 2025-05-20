import LoginForm from '@/components/Auth/SignInForm';
import SignUpForm from '@/components/Auth/SignUpForm';
import { FC } from 'react';

interface Props {}

const page: FC<Props> = () => {
	return <SignUpForm />;
};

export default page;
