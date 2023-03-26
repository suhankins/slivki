import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(() => {});

export const config = {
    matcher: ['/admin/:path*'],
};
