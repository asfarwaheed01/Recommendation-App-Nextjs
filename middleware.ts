import { authMiddleware } from '@clerk/nextjs';


export default authMiddleware({
  publicRoutes: [
    '/home',
    '/',
    '/ask',
    '/ask/:id',
    '/api/prompt/all',
    '/api/prompt',
    '/api/ai',
    '/api/feedback',
    '/blog',
    '/about',
    '/contact',
  ],
});


export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
