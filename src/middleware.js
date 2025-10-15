import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const userAgent = req.headers.get('user-agent') || '';
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  // Prevent redirect loop for the blocked page
  if (url.pathname.startsWith('/desktop-blocked')) {
    return NextResponse.next();
  }

  // If not mobile, redirect
  if (!isMobile) {
    return NextResponse.redirect(new URL('/desktop-blocked', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
