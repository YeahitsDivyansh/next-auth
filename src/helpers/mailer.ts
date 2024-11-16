/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}
    :any) =>{
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);

      if(emailType === 'VERIFY'){
        const updatedUser=await User.findByIdAndUpdate(userId,
          {$set: {
          verifyToken:hashedToken, 
          verifyTokenExpiry: Date.now() 
          + 3600000}})
      } else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userId,{
          $set:{forgotPasswordToken:hashedToken, 
          forgotPasswordTokenExpiry: Date.now() + 3600000}})
      }

        // Looking to send emails in production? Check out our Email API/SMTP product!
      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7cef84c802bd78",
          pass: "8353979324d0af",
        },
      });

        const mailOptions = {
            from: 'divyansh@divyansh.ai',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email"
            : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/
            verifyemail?token=${hashedToken}">here</a> to 
            ${emailType === "VERIFY" ? 
            "verify your email" : "reset your password"} 
            or copy and paste the link in your browser.
            </br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
          }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}