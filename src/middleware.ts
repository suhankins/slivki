import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { localizationMiddleware } from './middleware/localizationMiddleware';
import { authMiddleware } from './middleware/authMiddleware';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
    async function middleware(request: NextRequest) {
        return localizationMiddleware(request, NextResponse.next());
    },
    {
        callbacks: {
            authorized: ({ req, token }) => !!(authMiddleware(req) || token),
        },
    }
);

export const config = {
    matcher: ['/((?!_next/static|static|_next/image|favicon.ico).*)'],
};
