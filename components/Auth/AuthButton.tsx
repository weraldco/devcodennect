import { memo } from 'react';
import LoadingState from '../Global/LoadingState';
import { Button } from '../ui/button';

interface Props {
	loading: boolean;
}

const AuthButton = memo(({ loading }: Props) => {
	return (
		<Button type="submit" className="w-full ">
			{loading ? <LoadingState></LoadingState> : 'SIGN-UP'}
		</Button>
	);
});

export default AuthButton;
