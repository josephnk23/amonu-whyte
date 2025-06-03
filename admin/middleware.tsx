import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user is trying to access protected routes
  if (pathname === '/' || pathname.startsWith('/dashboard') || pathname.startsWith('/products') || pathname.startsWith('/landing-page')) {
    // Check authentication (in a real app, verify JWT token)
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true'
    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If trying to access login while authenticated, redirect to dashboard
  if (pathname === '/login') {
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true'
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/products/:path*', '/landing-page/:path*', '/login']
}