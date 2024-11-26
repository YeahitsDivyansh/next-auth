/* eslint-disable @typescript-eslint/no-explicit-any */
// Disables TypeScript linting for explicit "any" type, which can be useful when error objects lack type definitions.

import { connect } from '@/dbConfig/dbConfig';
// Importing the database connection function to establish a connection to MongoDB.

import User from '@/models/userModel';
// Importing the User model to interact with the `users` collection in the database.

import { NextRequest, NextResponse } from 'next/server';
// Importing Next.js-specific objects for handling server-side requests and responses.

import bcryptjs from 'bcryptjs';
// Library for securely hashing and verifying passwords.

import jwt from "jsonwebtoken";
// Library for generating JSON Web Tokens (JWT) for secure user authentication.

connect();
// Establish the connection to MongoDB. This ensures the database is ready for operations.

export async function POST(request: NextRequest) {
    try {
        // Parse the incoming request body to extract login data
        const reqBody = await request.json();
        const { email, password } = reqBody;
        // Extracting `email` and `password` from the parsed request body

        console.log(reqBody); 
        // Logging the request body for debugging purposes.

        // Check if a user with the given email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: 'User does not exist' }, 
                { status: 400 }
            );
            // If no user is found, respond with an error message and a 400 status code.
        }

        console.log("User exists");
        // Logging a confirmation that the user exists.

        // Compare the provided password with the hashed password stored in the database
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: 'Invalid password' }, 
                { status: 400 }
            );
            // If the password does not match, respond with an error message and a 400 status code.
        }

        console.log(user);
        // Logging the user object for debugging purposes.

        // Prepare data to include in the JSON Web Token (JWT)
        const tokenData = {
            id: user._id,        // User ID
            username: user.username, // Username
            email: user.email    // Email
        };

        // Generate a JWT with the token data and a 1-day expiration time
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });
        // `process.env.TOKEN_SECRET` is a secret key used to sign the token; ensure it is stored securely.

        // Create a successful response object
        const response = NextResponse.json({
            message: 'Login successful',
            success: true
        });

        // Set the JWT as a cookie in the response
        response.cookies.set('token', token, {
            httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript for security
        });

        return response;
        // Return the response with the success message and the token cookie.

    } catch (error: any) {
        // Catch and handle any errors during the login process
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
        // Return a 500 status code and the error message in case of server-side issues.
    }
}
