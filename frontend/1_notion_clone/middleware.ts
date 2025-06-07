// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Run middleware on all routes except static files and Next.js internals
    '/((?!_next|.*\\..*|favicon.ico).*)',
    // Always run for API and tRPC routes
    '/(api|trpc)(.*)',
  ],
};
