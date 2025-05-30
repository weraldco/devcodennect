import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Montserrat, Poppins, Roboto } from 'next/font/google';
import './globals.css';

const montserratFont = Montserrat({
	variable: '--font-montserrat',
	weight: ['400', '500', '600', '800'],
	subsets: ['latin'],
});

const robotoFont = Roboto({
	variable: '--font-roboto',
	weight: ['400', '600', '800'],
	subsets: ['latin'],
});
const poppinsFont = Poppins({
	variable: '--font-poppins',
	weight: ['400', '600', '800'],
	subsets: ['latin'],
});
export const metadata: Metadata = {
	title: 'devCodennect',
	description: "We're developers meet and connect.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${montserratFont.variable} ${robotoFont.variable} ${poppinsFont.variable} antialiased font-roboto`}
			>
				<div className=" w-full flex items-center justify-center ">
					{children}
				</div>
				<Toaster />
			</body>
		</html>
	);
}
