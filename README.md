# User Authentication System

## Introduction

This project is a **User Authentication System** built using **Next.js**, **React**, and **Tailwind CSS**. It allows users to **sign up**, **log in**, **verify their email**, and view their **profile page** after authentication. The application includes basic authentication features such as **JWT token handling**, **email verification** through a unique token, and **logout functionality**.

The project is intended to demonstrate the integration of frontend and backend components in a full-stack application, ensuring a seamless and secure user experience.

## Features

- **User Signup**: Users can sign up by providing their email, username, and password.
- **User Login**: Registered users can log in with their credentials to access the app.
- **Email Verification**: After signing up, users receive a unique token for email verification.
- **User Profile**: Authenticated users can view their profile information.
- **Logout**: Users can log out to end their session and remove the JWT token.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express (via API routes in Next.js)
- **Database**: MongoDB (via Mongoose ORM)
- **Authentication**: JWT (JSON Web Token)
- **Email Service**: (If integrated in the backend, e.g., SendGrid or Nodemailer)

## Prerequisites

- Node.js
- npm or yarn
- MongoDB (local or cloud database)

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
