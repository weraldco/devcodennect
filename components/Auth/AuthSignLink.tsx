import Link from 'next/link';
import { memo } from 'react';

type AuthSignLinkType = {
	url: string;
	urlLabel?: string;
	label: string;
};

export const AuthSignLink = memo(
	({ url, urlLabel, label }: AuthSignLinkType) => (
		<span>
			{label}
			<Link href={url} className="text-teal-400 hover:opacity-70 duration-200">
				{urlLabel ? urlLabel : 'Click here'}
			</Link>
		</span>
	)
);
