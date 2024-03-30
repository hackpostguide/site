import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from 'firebase/auth'
import { auth } from '@/app/lib/firebase'

console.log('Middleware loaded')

export async function middleware(request: NextRequest) {
  console.log('Request URL:', request.nextUrl.toString())

  const { pathname, origin } = request.nextUrl
  const currentUser = auth.currentUser

  console.log('Current user:', currentUser)

  // If the user is not signed in and trying to access /dashboard, redirect to /enter
  if (!currentUser && pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/enter'
    return NextResponse.redirect(url)
  }

  // If the user is signed in and trying to access /enter, redirect to /dashboard
  if (currentUser && pathname === '/enter') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // For all other cases, continue to the requested resource
  return NextResponse.next()
}

// Specify which routes this middleware should be applied to
export const config = {
  matcher: ['/', '/about/:path*', '/dashboard/:path*', '/enter/:path*'],
}