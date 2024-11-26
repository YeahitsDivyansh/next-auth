/* eslint-disable @typescript-eslint/no-explicit-any */
// Disables TypeScript linting for explicit "any" type, which can be helpful when error objects are untyped.

import { NextResponse } from "next/server";
// Importing Next.js's response utility to construct and return server-side responses.

export async function GET() {
    try {
        // Create a successful JSON response indicating the user has been logged out
        const response = NextResponse.json(
            {
                message: "Logout successful", // Informational message for the client
                success: true, // Indicates the operation was successful
            }
        );

        // Clear the authentication token by overwriting the "token" cookie with an empty value
        response.cookies.set("token", "", {
            httpOnly: true, // Ensure the cookie is inaccessible to client-side JavaScript for security
            expires: new Date(0), // Set the expiration date to the past, effectively deleting the cookie
        });

        return response;
        // Return the response to the client with the cleared cookie.
    } catch (error: any) {
        // Handle any unexpected errors during the logout process
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
        );
        // Respond with a 500 Internal Server Error and include the error message.
    }
}
