import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: [
    '/try-on/:path*',
    '/history/:path*',
    '/profile/:path*',
  ],
};
