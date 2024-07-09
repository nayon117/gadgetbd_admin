import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptKey } from './lib/utils';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith('/admin')) {
    const encryptedKey = request.cookies.get('accessKey')?.value;
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (accessKey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
