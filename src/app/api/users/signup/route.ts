/* eslint-disable @typescript-eslint/no-explicit-any */
// Disables TypeScript's linting for explicit "any" type, which can help avoid warnings for untyped variables.

import { connect } from "@/dbConfig/dbConfig"; 
// Importing the database connection function to establish a connection to MongoDB.

import User from "@/models/userModel"; 
// Importing the User model to interact with the `users` collection in the database.

import { NextRequest, NextResponse } from "next/server"; 
// Next.js-specific objects for handling server-side API requests and responses.

import bcryptjs from "bcryptjs"; 
// Library for hashing passwords securely.

import { sendEmail } from "@/helpers/mailer"; 
// Importing a helper function to send emails for tasks like verification.

connect(); 
// Establish the connection to the MongoDB database. This ensures the database is ready for operations.

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json(); 
        // Parse the incoming request body as JSON to extract the user data.

        const { username, email, password } = reqBody; 
        // Destructure the relevant fields from the request body.

        console.log(reqBody); 
        // Log the request body for debugging purposes.

        // Check if the user already exists in the database
        const user = await User.findOne({ email }); 
        // Query the database for an existing user with the provided email.

        if (user) {
            return NextResponse.json(
                { error: "User already exists" }, 
                { status: 400 }
            );
            // If a user is found, return a response indicating that the email is already in use.
        }

        // Hash the user's password for secure storage
        const salt = await bcryptjs.genSalt(10); 
        // Generate a salt with a complexity factor of 10.

        const hashedPassword = await bcryptjs.hash(password, salt); 
        // Hash the password using the generated salt.

        // Create a new user document using the User model
        const newUser = new User({
            username, // Set the username
            email,    // Set the email
            password: hashedPassword, // Store the hashed password
        });

        const savedUser = await newUser.save(); 
        // Save the new user to the database and get the saved document.

        console.log(savedUser); 
        // Log the saved user for debugging purposes.

        // Send a verification email to the user
        await sendEmail({
            email,            // Recipient's email address
            emailType: "VERIFY", // Email type, indicating a verification email
            userId: savedUser._id, // User ID to include in the email for verification
        });

        // Return a success response to the client
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser, // Include the saved user object in the response
        });

    } catch (error: any) {
        // Catch any errors during the signup process
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
        );
        // Return an error response with a 500 status code and the error message.
    }
}
