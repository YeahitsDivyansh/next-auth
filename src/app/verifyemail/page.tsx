/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Disabling React hook warnings for dependency array and any type linting.

"use client";
// Indicates this is a client-side component in Next.js.

import axios from "axios";
// Importing `axios` for making HTTP requests.

import Link from "next/link";
// Importing `Link` for navigation to other pages within the Next.js application.

import React, { useEffect, useState } from "react";
// Importing necessary React hooks (`useEffect` and `useState`) for managing component state and side effects.

export default function VerifyEmailPage() {
    // Function to handle email verification page.

    const [token, setToken] = useState("");
    // State to store the token extracted from the URL query parameters.

    const [verified, setVerified] = useState(false);
    // State to track whether the email verification was successful.

    const [error, setError] = useState(false);
    // State to track whether there was an error during the email verification process.

    const verifyUserEmail = async () => {
        // Function to handle the API call for email verification.
        try {
            await axios.post("/api/users/verifyemail", { token });
            // Sends a POST request to the `/verifyemail` endpoint with the token in the request body.

            setVerified(true);
            // Sets the `verified` state to `true` on successful verification.

            setError(false);
            // Resets the `error` state in case the verification was successful.
        } catch (error: any) {
            setError(true);
            // Sets the `error` state to `true` if the API call fails.

            console.log(error.response.data);
            // Logs the error response data to the console for debugging.
        }
    };

    useEffect(() => {
        // Effect to run when the component mounts (i.e., when the page loads).
        setError(false);
        // Resets the `error` state to `false` each time the component is mounted.

        const urlToken = window.location.search.split("=")[1];
        // Extracts the token from the URL query parameters.

        setToken(urlToken || "");
        // Sets the `token` state with the extracted token, or an empty string if not found.
    }, []);
    // This effect runs once when the component is mounted.

    useEffect(() => {
        // Effect to trigger the email verification when the token changes.
        setError(false);
        // Resets the `error` state in case a new token is set.

        if (token.length > 0) {
            verifyUserEmail();
        }
        // Calls the `verifyUserEmail` function if the `token` state is not empty.
    }, [token]);
    // This effect runs when the `token` state changes.

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {/* Main container with flexbox layout for centering content. */}
            <h1 className="text-4xl">Verify Email</h1>
            {/* Title for the page */}
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            {/* Displays the extracted token, or "no token" if it's not available. */}

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    {/* Displayed when the email is successfully verified */}
                    <Link href="/login">
                        Login
                    </Link>
                    {/* Link to the login page after successful verification */}
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    {/* Displayed when there is an error during the verification */}
                </div>
            )}
        </div>
    );
}
