import { type NextRequest } from 'next/server';
import { getSession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return Response.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/submit'],
};
