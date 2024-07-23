import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
    const token = await getToken({ req });
    const url = req.nextUrl;

    if (token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname === '/'
    )) {
        console.log("hiM");
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/verify/:path*',
        '/dashboard/:path*'
    ]
};

// Ensure this line is placed after the custom middleware
export { default } from "next-auth/middleware";
