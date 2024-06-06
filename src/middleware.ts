import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
    const data = await auth();
    if (data) {
        const role = data.user?.role;
        if (role === "library") {
            if (request.nextUrl.pathname.startsWith('/user')) {
                return NextResponse.redirect(new URL('/library', request.url));
            } else if (request.nextUrl.pathname.startsWith('/admin')) {
                return NextResponse.redirect(new URL('/library', request.url));
            }
        } else if (role === "user") {
            if (request.nextUrl.pathname.startsWith('/library')) {
                return NextResponse.redirect(new URL('/user', request.url));
            } else if (request.nextUrl.pathname.startsWith('/admin')) {
                return NextResponse.redirect(new URL('/user', request.url));
            }
        } else if (role === "admin") {
            if (request.nextUrl.pathname.startsWith('/user')) {
                return NextResponse.redirect(new URL('/admin', request.url));
            } else if (request.nextUrl.pathname.startsWith('/library')) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        }
    }
}