import User from '@/Models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';


type EmailProps = {
    email: string;
    emailType: string;
    userId: string;
};

export const sendEmail = async({email , emailType , userId}:EmailProps) =>{
    try {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        //TODO : configure mail for usage
        if(emailType === "VERIFY"){
          const updatedUser = await User.findByIdAndUpdate(userId , 
            { $set: {
              verifyToken: hashedToken , 
              verifyTokenExpiry: new Date(Date.now() +
               3600000)
            }}
          );
          console.log(updatedUser);

        }else if(emailType === "RESET"){
          await User.findByIdAndUpdate(userId , {
            $set:
            {forgotPasswordToken: hashedToken ,
               forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
              }
        });
        }
        
        // Looking to send emails in production? Check out our Email API/SMTP product!
          const  transport = nodemailer.createTransport({
           host: "sandbox.smtp.mailtrap.io",
           port: 2525,
           auth: {
           user: "fd2c608f1ffea4",
           pass: "7705565dba819c"
          }
        });

          const mailOptions = {
            from: 'shk@gmail.com', 
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset Your Password",
            html: `<p>Click <a href ="${process.env.DOMAIN}/verifyemail/?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
          }
          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    }  catch (error: unknown) {
        console.log("Error sending email", error);
    }
}
