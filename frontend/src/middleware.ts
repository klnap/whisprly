import { NextRequest, NextResponse } from 'next/server';
import authMiddleware from './modules/auth/middleware';

export default async function middleware(request: NextRequest) {
  // const response = await authMiddleware(request);
  
  // if (response) {
  //   return response;
  // }

  const response = NextResponse.next();

  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: [
    // Apply middleware to all routes except static files and API routes
    '/((?!_next/|api/|favicon.ico|robots.txt).*)',
  ],
}; 