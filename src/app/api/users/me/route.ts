/* eslint-disable @typescript-eslint/no-explicit-any */
// Disables TypeScript linting for explicit "any" type, which can be helpful for handling dynamic error objects.

import { connect } from '@/dbConfig/dbConfig';
// Importing the database connection function to establish a connection to MongoDB.

import User from '@/models/userModel';
// Importing the User model to interact with the `users` collection in the database.

import { NextRequest, NextResponse } from 'next/server';
// Importing Next.js-specific objects for handling server-side requests and responses.

import { getDataFromToken } from '@/helpers/getDataFromToken';
// Utility function to extract user ID or related data from the authentication token.

connect();
// Establish the connection to MongoDB. This ensures the database is ready for operations.

export async function POST(request: NextRequest) {
    try {
        // Extract the user's ID from the token present in the request
        const userId = await getDataFromToken(request);
        // `getDataFromToken` is a helper function that decodes the token, verifies its validity, and extracts the user ID.

        // Find the user in the database using the extracted user ID
        const user = await User.findOne({ _id: userId }).select("-password");
        // The `select("-password")` ensures the password field is excluded from the returned data for security.

        // Return the user data as a JSON response with a success message
        return NextResponse.json({
            message: "User found", // Success message
            data: user // User object, excluding the password field
        });

    } catch (error: any) {
        // Catch and handle any errors during the process
        return NextResponse.json(
            { error: error.message }, 
            { status: 400 }
        );
        // Respond with a 400 status code and the error message in case of failure.
    }
}
