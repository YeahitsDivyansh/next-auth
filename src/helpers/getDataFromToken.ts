/* eslint-disable @typescript-eslint/no-explicit-any */
// Disables TypeScript linting for explicit "any" type, which can be useful for dynamic or untyped error objects.

import { NextRequest } from "next/server";
// Importing Next.js's `NextRequest` object, which provides access to request-specific properties like cookies.

import jwt from "jsonwebtoken";
// Importing `jsonwebtoken` library to decode and verify JSON Web Tokens (JWT).

export const getDataFromToken = (request: NextRequest) => {
    try {
        // Retrieve the "token" cookie from the request
        const token = request.cookies.get("token")?.value || '';
        // `request.cookies.get("token")` extracts the cookie with the name "token".
        // If the token is not found, it defaults to an empty string.

        // Verify the token using the secret key
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        // `jwt.verify` decodes the token and ensures it is valid.
        // The secret key (`TOKEN_SECRET`) is used to verify the token's signature.

        return decodedToken.id;
        // Extract the user ID (`id`) from the decoded token and return it.

    } catch (error: any) {
        // Catch and handle any errors that occur during token verification
        throw new Error(error.message);
        // If an error occurs, it throws a new error with the error message.
    }
}
