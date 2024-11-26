'use client' // Indicates this is a client-side component in Next.js.

import { useParams } from "next/navigation";
// Importing `useParams` hook from Next.js for accessing dynamic route parameters.

export default function UserProfile() {
  // Main component for displaying user profile.

  const { id } = useParams(); 
  // Destructuring `id` from the dynamic route parameter. This is the user ID from the URL (e.g., `/profile/[id]`).

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {/* Flex container for centering the profile content */}
      <h1>Profile</h1>
      {/* Title of the page */}

      <hr />
      {/* Horizontal line for visual separation */}

      <p className="text-4xl">
        {/* Large font size for displaying "Profile page" */}
        Profile page 
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {/* Displaying the dynamic `id` (the user ID) with styling */}
          {id}
        </span>
      </p>
    </div>
  );
}
