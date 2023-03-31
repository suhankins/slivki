import { withAuth } from 'next-auth/middleware';

/**
 * There should ever only be 1 account, so if user is logged in, they are an admin
 */
export default withAuth(() => {});

export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
};
