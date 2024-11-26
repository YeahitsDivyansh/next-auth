/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// Indicates this is a client-side component in Next.js.

import Link from "next/link";
// Importing Link to allow navigation between pages within the Next.js app.

import React, { useEffect } from "react";
// Importing React and useEffect hook for managing component state and side effects.

import { useRouter } from "next/navigation";
// Importing useRouter to navigate programmatically after successful login.

import axios from "axios";
// Importing axios for making HTTP requests.

import { toast } from "react-hot-toast";
// Importing react-hot-toast for toast notifications (success/error messages).

export default function LoginPage() {
    // Main login page component.

    const router = useRouter();
    // useRouter hook to navigate the user after successful login.

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    // State to store user credentials (email and password).

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    // State to control the button's disabled state based on input validation.

    const [loading, setLoading] = React.useState(false);
    // State to track whether the login process is ongoing (for loading state).

    const onLogin = async () => {
        // Function to handle login process.
        try {
            setLoading(true);
            // Set loading to true to show that the login is in progress.

            const response = await axios.post("/api/users/login", user);
            // Send a POST request to the backend to verify login credentials.

            console.log("Login success", response.data);
            // Log the successful login response to the console.

            toast.success("Login success");
            // Show a success toast message to the user.

            router.push("/profile");
            // Redirect the user to the profile page after successful login.

        } catch (error: any) {
            console.log("Login failed", error.message);
            // Log the error message to the console if the login fails.

            toast.error(error.message);
            // Show an error toast message with the error message.
        } finally {
            setLoading(false);
            // Set loading to false after the login attempt (success or failure).
        }
    };

    useEffect(() => {
        // useEffect hook to enable/disable the login button based on form input.
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
            // Enable the login button if both email and password fields are filled.
        } else {
            setButtonDisabled(true);
            // Disable the login button if any of the fields are empty.
        }
    }, [user]);
    // The effect will run every time the user state (email or password) changes.

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {/* Main container styled using Tailwind CSS for centering and layout. */}
            <h1>{loading ? "Processing" : "Login"}</h1>
            {/* Display "Processing" text if loading, otherwise "Login" */}
            <hr />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            {/* Input field for email, updating state on change */}
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            {/* Input field for password, updating state on change */}
            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "No Login" : "Login"}
            </button>
            {/* Button to trigger login, disabled if either email or password is empty */}
            <Link href="/signup">Visit Signup page</Link>
            {/* Link to navigate the user to the signup page */}
        </div>
    );
}
