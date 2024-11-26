/* eslint-disable @typescript-eslint/no-explicit-any */
// Disables TypeScript linting for explicit "any" type, which can be useful when working with untyped errors or dynamic objects.

import { connect } from '@/dbConfig/dbConfig';
// Importing the database connection function to establish a connection to MongoDB.

import User from '@/models/userModel';
// Importing the User model to interact with the `users` collection in the database.

import { NextRequest, NextResponse } from 'next/server';
// Importing Next.js-specific objects for handling server-side requests and responses.

connect();
// Establish the connection to MongoDB. This ensures the database is ready for operations.

export async function POST(request: NextRequest) {
    try {
        // Parse the incoming request body to extract the token
        const reqBody = await request.json();
        const { token } = reqBody;
        // Extracting the verification `token` from the parsed request body

        console.log(token);
        // Log the token for debugging purposes.

        // Find a user with the given token and ensure the token is not expired
        const user = await User.findOne({
            verifyToken: token, // Match the verification token
            verifyTokenExpiry: { $gt: Date.now() }, // Ensure the token's expiry time is in the future
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 400 }
            );
            // If no matching user is found or the token is expired, respond with an error message and a 400 status code.
        }

        console.log(user);
        // Log the user object for debugging purposes.

        // Mark the user's email as verified and clear the verification token and expiry fields
        user.isVerified = true; // Update the `isVerified` flag to true
        user.verifyToken = undefined; // Remove the verification token
        user.verifyTokenExpiry = undefined; // Remove the token expiry date

        await user.save();
        // Save the updated user object to the database.

        // Respond with a success message
        return NextResponse.json(
            {
                message: 'Email verified successfully', // Informational success message for the client
                success: true, // Indicates the operation was successful
            },
            { status: 200 }
        );

    } catch (error: any) {
        // Catch and handle any unexpected errors during the email verification process
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
        );
        // Return a 500 status code and the error message in case of server-side issues.
    }
}
