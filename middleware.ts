import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

const requireAuth = ['/profile']

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const pathname = request.nextUrl.pathname

  if (requireAuth.some(path => pathname.startsWith(path))) {
    const token = await getToken({ req: request })

    // if not logged in
    if (!token) {
      const url = new URL('/auth/signin', request.url)
      url.searchParams.set('callbackUrl', encodeURI(request.url))
      return NextResponse.redirect(url)
    }
  }
  return res
}
