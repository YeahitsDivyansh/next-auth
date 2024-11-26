import mongoose from "mongoose"; // Importing the Mongoose library for interacting with MongoDB

// Async function to establish a connection to the MongoDB database
export async function connect() {
    try {
        // Connect to the MongoDB database using the URI from environment variables
        mongoose.connect(process.env.MONGO_URI!); 
        // The `process.env.MONGO_URI` holds the database connection string, typically stored securely in `.env`

        const connnection = mongoose.connection; 
        // Access the connection instance to attach event listeners and manage the connection

        // Event listener for a successful connection to MongoDB
        connnection.on('connected', () => {
            console.log('MongoDB connected'); 
            // Logs a success message when the connection is established
        });

        // Event listener for connection errors
        connnection.on('error', (err) => {
            console.log('MongoDB connection error, please make sure db is up and running' + err); 
            // Logs an error message if there is an issue with the connection
            process.exit(); 
            // Exits the process if the database fails to connect, signaling an error state
        });
    } catch (error) {
        // General error handling for issues during the connection process
        console.log('Something went wrong in connecting to DB'); 
        // Logs a generic error message
        console.log(error); 
        // Logs the actual error for debugging purposes
    }
}
