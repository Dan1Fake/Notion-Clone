import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)', // example matcher — adapt to your needs
    '/api/:path*',
  ],
};
