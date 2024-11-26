/* eslint-disable @typescript-eslint/no-explicit-any */
// Disables TypeScript linting for explicit "any" type, which is used in cases like error handling.

"use client";
// Indicates this is a client-side component in Next.js (not server-rendered).

import Link from "next/link";
// Importing `Link` for client-side navigation between routes in a Next.js app.

import React, { useEffect } from "react";
// Importing React for component creation and the `useEffect` hook for managing side effects.

import { useRouter } from "next/navigation";
// Importing `useRouter` to programmatically navigate between routes.

import axios from "axios";
// Library for making HTTP requests, such as API calls.

import { toast } from "react-hot-toast";
// Library for displaying non-blocking toast notifications for success or error messages.

export default function SignupPage() {
    // Defining a functional component for the signup page.

    const router = useRouter();
    // Hook for navigation between pages programmatically.

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    // State to store user input fields for email, password, and username.

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    // State to control whether the signup button is enabled or disabled.

    const [loading, setLoading] = React.useState(false);
    // State to track if the signup process is currently loading.

    const onSignup = async () => {
        // Function to handle the signup process.
        try {
            setLoading(true);
            // Sets the `loading` state to true, indicating that the signup process has started.

            const response = await axios.post("/api/users/signup", user);
            // Sends a POST request to the signup API endpoint with the `user` object as the payload.

            console.log("Signup success", response.data);
            // Logs the API response in case of successful signup.

            router.push("/login");
            // Navigates the user to the `/login` page after successful signup.
        } catch (error: any) {
            // Handles any errors during the API call.
            console.log("Signup failed", error.message);
            // Logs the error message for debugging purposes.

            toast.error(error.message);
            // Displays a toast notification with the error message.
        } finally {
            setLoading(false);
            // Ensures that the loading state is reset to false regardless of success or failure.
        }
    };

    useEffect(() => {
        // Effect to enable or disable the signup button based on input validity.
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
            // Enables the button if all fields have valid values.
        } else {
            setButtonDisabled(true);
            // Disables the button if any field is empty.
        }
    }, [user]);
    // Runs the effect whenever the `user` state changes.

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {/* Container for the signup form with a flex layout and centered content. */}
            <h1>{loading ? "Processing" : "Signup"}</h1>
            {/* Displays "Processing" if loading, otherwise displays "Signup". */}

            <hr />
            {/* Horizontal line for visual separation. */}

            <label htmlFor="username">username</label>
            {/* Label for the username input field. */}
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                }
                placeholder="username"
            />
            {/* Input field for username with two-way data binding and Tailwind CSS styling. */}

            <label htmlFor="email">email</label>
            {/* Label for the email input field. */}
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            {/* Input field for email with two-way data binding and Tailwind CSS styling. */}

            <label htmlFor="password">password</label>
            {/* Label for the password input field. */}
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                }
                placeholder="password"
            />
            {/* Input field for password with two-way data binding and Tailwind CSS styling. */}

            <button
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            {/* Button for initiating signup. Disabled if input fields are empty. */}

            <Link href="/login">Visit login page</Link>
            {/* Link for navigating to the login page. */}
        </div>
    );
}
