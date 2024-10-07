import { NextRequest, NextResponse } from 'next/server';

import { EnumTokens } from './types/auth.types';

export async function middleware(request: NextRequest) {
  const { url, cookies } = request;
  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
  const isAuthPage = url.includes('/auth');

  if (isAuthPage && refreshToken)
    return NextResponse.redirect(new URL('/', url));
  if (isAuthPage) return NextResponse.next();
  if (!refreshToken) return NextResponse.redirect(new URL('/auth', url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*', '/auth:path'],
};
