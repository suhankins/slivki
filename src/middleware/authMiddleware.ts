import { NextRequest } from 'next/server';

export function authMiddleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname.split('/');
    pathname.shift(); // remove the first empty string
    if (pathname[0] === 'api' || pathname[0] === 'admin') return false;
    return true;
}
