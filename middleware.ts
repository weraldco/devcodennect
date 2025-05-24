// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value;
	const { pathname } = request.nextUrl;
	// Protect routes that start with /dashboard
	const publicPath = ['/auth/signin', '/auth/signup'];

	const isPublicPath = publicPath.includes(pathname);

	// Check if user is logged-in and public path if not -> redirect to login
	if (!token && !isPublicPath) {
		const loginUrl = new URL('/auth/signin', request.url);
		return NextResponse.redirect(loginUrl);
	}

	if (token && isPublicPath) {
		const dashboard = new URL('/', request.url);
		return NextResponse.redirect(dashboard);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|api|favicon.ico).*)'], // protect any /dashboard route
};
