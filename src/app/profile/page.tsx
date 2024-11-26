/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// Indicates this is a client-side component in Next.js.

import axios from "axios";
// Importing axios for making HTTP requests.

import Link from "next/link";
// Importing Link to allow navigation to other pages within the Next.js app.

import React, { useState } from "react";
// Importing React and useState hook for managing component state.

import { toast } from "react-hot-toast";
// Importing react-hot-toast for showing success or error notifications.

import { useRouter } from "next/navigation";
// Importing useRouter to navigate programmatically after actions like logout or fetching user details.

export default function ProfilePage() {
  // Main profile page component.

  const router = useRouter();
  // useRouter hook to programmatically navigate the user to different pages (e.g., logout or profile page).

  const [data, setData] = useState("nothing");
  // State to store user details or message (default is "nothing" until user details are fetched).

  const logout = async () => {
    // Function to handle user logout.
    try {
      await axios.get('/api/users/logout');
      // Sends a GET request to the backend to log out the user.

      toast.success('Logout successful');
      // Show a success toast message after logout.

      router.push('/login');
      // Redirect the user to the login page after successful logout.

    } catch (error: any) {
      console.log(error.message);
      // Log any errors that occur during logout.

      toast.error(error.message);
      // Show an error toast with the error message if logout fails.
    }
  };

  const getUserDetails = async () => {
    // Function to fetch user details.
    try {
      const res = await axios.post('/api/users/me');
      // Send a POST request to get the user details from the backend.

      console.log(res.data);
      // Log the response from the backend containing user details.

      setData(res.data.data._id);
      // Store the user's ID in the state (or any other relevant data).

    } catch (error: any) {
      console.log(error.message);
      // Log any errors that occur during the API call.

      toast.error('Failed to fetch user details');
      // Show an error toast if fetching user details fails.
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {/* Main container styled using Tailwind CSS for layout and centering */}
      <h1>Profile</h1>
      {/* Title of the page */}
      <hr />
      <p>Profile page</p>
      {/* A brief description */}

      <h2 className="p-1 rounded bg-green-500">
        {/* Display user ID or message based on state */}
        {data === 'nothing' ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>
            {/* Link to a user-specific profile page (dynamic routing based on the user ID) */}
            {data}
          </Link>
        )}
      </h2>

      <hr />

      {/* Logout button */}
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      {/* Button to fetch and display user details */}
      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
    </div>
  );
}
