import { NextResponse } from 'next/server'
// Importing `NextResponse` to manage server-side responses, such as redirects.

import type { NextRequest } from 'next/server'
// Importing `NextRequest` type to define the request object for type checking.

export function middleware(request: NextRequest) {
    // Middleware function to control access to specific routes based on authentication status.

    const path = request.nextUrl.pathname
    // Extracts the path of the current request from the `NextRequest` object.
    // This will be used to determine which route the user is trying to access.

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
    // Checks if the requested route is a public route (accessible without authentication).
    // Public routes include `/login`, `/signup`, and `/verifyemail`.

    const token = request.cookies.get('token')?.value || ''
    // Retrieves the authentication token from the request's cookies.
    // Defaults to an empty string if the token is not found.

    // Logic for handling access control:
    if (isPublicPath && token) {
        // If the user is already authenticated (has a token) and tries to access a public route:
        return NextResponse.redirect(new URL('/', request.url))
        // Redirects the user to the home page (`/`).
        // This prevents logged-in users from accessing routes like `/login` or `/signup`.
    }

    if (!isPublicPath && !token) {
        // If the user is trying to access a private route (not public) without authentication:
        return NextResponse.redirect(new URL('/login', request.url))
        // Redirects the user to the `/login` page to prompt them to log in.
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
    // Specifies the routes where this middleware will be applied.
    // Includes both public routes (`/login`, `/signup`, `/verifyemail`) and private routes (`/`, `/profile`).
}
