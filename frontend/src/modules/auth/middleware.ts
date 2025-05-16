import { NextRequest, NextResponse } from "next/server";
import { config } from "./config";
import { getUser } from "./actions";

export default async function authMiddleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(config.session_cookie);

  const redirectTo = (path: string) => {
    // Prevent redirect if we're already on the target path
    if (request.nextUrl.pathname === path) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(path, request.url).toString());
  };

  if (!sessionCookie) {
    return redirectTo(config.routes.urls.home);
  }

  const user = await getUser(sessionCookie.value);

  console.log('USER FRO MIDDLEWARE', user);

  if (!user) {
    return redirectTo(config.routes.urls.home);
  }

  const isRootPath = request.nextUrl.pathname === '/';
  const isVerifyPath = request.nextUrl.pathname.startsWith('/verify-email');

  if (user && isRootPath) {
    return redirectTo('/dashboard');
  }

  // if (user.email_verified_at === null && !isVerifyPath) {
  //   return redirectTo('/verify-email');
  // }

  return NextResponse.next();
}
