import nodemailer from 'nodemailer';
// Nodemailer is used for sending emails from the server.

export async function sendEmail({ email, emailType, userId }: { email: string; emailType: string; userId: string }) {
    try {
        // 1. Define email templates for different email types
        const subject = emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password";
        const link =
            emailType === "VERIFY"
                ? `${process.env.BASE_URL}/verify-email?token=${userId}`
                : `${process.env.BASE_URL}/reset-password?token=${userId}`;
        // Dynamically determine the email subject and content based on the email type.
        // For example, emailType "VERIFY" sends a verification email, while "RESET" sends a password reset email.

        // 2. Configure the transport using an SMTP server or a service like Gmail
        const transporter = nodemailer.createTransport({
            service: "gmail", // Specify the email service provider
            auth: {
                user: process.env.EMAIL_USER, // The email address to send emails from (stored securely in env variables)
                pass: process.env.EMAIL_PASS, // The password or app-specific password for the email address
            },
        });

        // 3. Define the email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender's email address
            to: email, // Recipient's email address
            subject, // Email subject determined earlier
            html: `<p>Please click the following link to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:</p>
                   <a href="${link}">${link}</a>
                   <p>This link will expire in 24 hours.</p>`,
            // Email content includes a message with a clickable link for verification or password reset.
        };

        // 4. Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
        // Log the success message, which includes the unique email message ID for reference.

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Unable to send email, please try again later.");
        // Log and throw an error if the email fails to send.
    }
}
