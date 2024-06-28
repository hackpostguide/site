import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

console.log('Middleware loaded')

export async function middleware(request: NextRequest) {
  console.log('Request URL:', request.nextUrl.toString())

  // Check if the path is '/expore' and redirect to '/explore'
  if (request.nextUrl.pathname === '/expore') {
    return NextResponse.redirect(new URL('/explore', request.url))
  }

  return NextResponse.next()
}

// Specify which routes this middleware should be applied to
export const config = {
  matcher: ['/', '/about/:path*', '/dashboard/:path*', '/enter/:path*', '/expore', '/explore'],
}