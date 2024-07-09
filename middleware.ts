// middleware.ts
import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { decryptKey } from '@/lib/utils';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/:path*']);

export default clerkMiddleware((auth, request) => {
  const response = NextResponse.next();

  if (!isPublicRoute(request)) {
    auth().protect();
  }

  const passkeyCookie = request.cookies.get('accessKey');
  let decryptedKey: string | null = null;

  if (passkeyCookie) {
    try {
      decryptedKey = decryptKey(passkeyCookie.value);
    } catch (e) {
      console.error('Error decrypting passkey:', e);
    }
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (decryptedKey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
