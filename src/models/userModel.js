import mongoose from "mongoose";

// Define a schema for the "users" collection in MongoDB
const userSchema = new mongoose.Schema({
    // Field to store the username of the user
    username: {
        type: String, // Data type: String
        required: [true, "Please provide a username"], // Validation: username is mandatory
        unique: true, // Ensures no two users can have the same username
    },

    // Field to store the email address of the user
    email: {
        type: String, // Data type: String
        required: [true, "Please provide an email"], // Validation: email is mandatory
        unique: true, // Ensures no two users can have the same email
    },

    // Field to store the hashed password of the user
    password: {
        type: String, // Data type: String
        required: [true, "Please provide a password"], // Validation: password is mandatory
    },

    // Field to indicate if the user's email is verified
    isVerified: {
        type: Boolean, // Data type: Boolean
        default: false, // Default value is false (email is not verified by default)
    },

    // Field to indicate if the user has admin privileges
    isAdmin: {
        type: Boolean, // Data type: Boolean
        default: false, // Default value is false (user is not an admin by default)
    },

    // Field to store the token for resetting the password
    forgotPasswordToken: {
        type: String, // Data type: String
    },

    // Field to store the expiration time of the forgot password token
    forgotPasswordTokenExpiry: {
        type: Date, // Data type: Date
    },

    // Field to store the token for email verification
    verifyToken: {
        type: String, // Data type: String
    },

    // Field to store the expiration time of the email verification token
    verifyTokenExpiry: {
        type: Date, // Data type: Date
    },
});

// Define a model based on the schema
// If a model with the name "users" already exists in the mongoose models cache, reuse it;
// otherwise, create a new model
const User = mongoose.models.users || mongoose.model("users", userSchema);

// Export the model to use it in other parts of the application
export default User;
