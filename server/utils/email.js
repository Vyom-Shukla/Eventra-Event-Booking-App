const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Booking Confirmed: ${eventTitle}`,
      html: `
                <div style="margin:0; padding:40px 15px; background-color:#f4f5f7; font-family:Arial, Helvetica, sans-serif;">
                    <div style="max-width:560px; margin:0 auto; background-color:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #e5e7eb;">

                        <div style="background-color:#171717; padding:25px 30px; text-align:center;">
                            <h1 style="margin:0; color:#ffffff; font-size:28px; letter-spacing:1px;">
                                Eventra
                            </h1>
                            <p style="margin:6px 0 0; color:#d1d5db; font-size:12px; letter-spacing:1px;">
                                EXPERIENCES WORTH REMEMBERING
                            </p>
                        </div>

                        <div style="padding:35px 30px; color:#333333;">
                            <div style="text-align:center; margin-bottom:25px;">
                                <div style="display:inline-block; width:55px; height:55px; line-height:55px; border-radius:50%; background-color:#e8f7ed; color:#16a34a; font-size:30px; font-weight:bold;">
                                    &#10003;
                                </div>
                                <h2 style="margin:18px 0 8px; color:#171717; font-size:24px;">
                                    Booking Confirmed!
                                </h2>
                                <p style="margin:0; color:#777777; font-size:14px;">
                                    Your spot is reserved. Get ready for an amazing experience!
                                </p>
                            </div>

                            <p style="font-size:15px; line-height:1.6;">
                                Hi ${userName},
                            </p>

                            <p style="font-size:15px; line-height:1.6; color:#555555;">
                                We're excited to let you know that your booking has been successfully confirmed.
                            </p>

                            <div style="margin:25px 0; padding:20px; background-color:#f8f9fb; border:1px solid #e5e7eb; border-radius:8px;">
                                <p style="margin:0 0 8px; color:#888888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">
                                    Your booked event
                                </p>
                                <h3 style="margin:0; color:#171717; font-size:19px;">
                                    ${eventTitle}
                                </h3>
                                <p style="margin:12px 0 0; color:#16a34a; font-size:13px; font-weight:bold;">
                                    &#10003; Booking Successfully Confirmed
                                </p>
                            </div>

                            <p style="font-size:14px; line-height:1.6; color:#555555;">
                                Thank you for choosing Eventra. We look forward to being part of your experience!
                            </p>

                            <p style="margin-top:30px; font-size:14px; color:#555555;">
                                Best regards,<br/>
                                <strong style="color:#171717;">Team Eventra</strong>
                            </p>
                        </div>

                        <div style="padding:20px 30px; background-color:#f8f9fb; border-top:1px solid #eeeeee; text-align:center;">
                            <p style="margin:0 0 8px; color:#777777; font-size:12px;">
                                Thank you for being a part of Eventra.
                            </p>
                            <p style="margin:0; color:#aaaaaa; font-size:11px;">
                                This is an automated confirmation email. Please do not reply.
                            </p>
                            <p style="margin:12px 0 0; color:#aaaaaa; font-size:11px;">
                                &copy; ${new Date().getFullYear()} Eventra. All rights reserved.
                            </p>
                        </div>

                    </div>
                </div>
            `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", userEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendOTPEmail = async (userEmail, otp, type) => {
  try {
    const title =
      type === "account_verification"
        ? "Verify your Eventra Account"
        : "Eventra Booking Verification";

    const msg =
      type === "account_verification"
        ? "Please use the following OTP to verify your new Eventra account."
        : "Please use the following OTP to verify and confirm your event booking.";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: title,
      html: `
                <div style="margin:0; padding:40px 15px; background-color:#f4f5f7; font-family:Arial, Helvetica, sans-serif;">
                    <div style="max-width:560px; margin:0 auto; background-color:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #e5e7eb;">

                        <div style="background-color:#171717; padding:25px 30px; text-align:center;">
                            <h1 style="margin:0; color:#ffffff; font-size:28px; letter-spacing:1px;">
                                Eventra
                            </h1>
                            <p style="margin:6px 0 0; color:#d1d5db; font-size:12px; letter-spacing:1px;">
                                EXPERIENCES WORTH REMEMBERING
                            </p>
                        </div>

                        <div style="padding:35px 30px; text-align:center; color:#333333;">
                            <h2 style="margin:0 0 15px; color:#171717; font-size:23px;">
                                ${title}
                            </h2>

                            <p style="margin:0 0 25px; color:#666666; font-size:15px; line-height:1.7;">
                                ${msg}
                            </p>

                            <div style="padding:25px 15px; margin:20px 0; background-color:#f8f9fb; border:1px solid #e5e7eb; border-radius:8px;">
                                <p style="margin:0 0 12px; color:#888888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">
                                    Your Verification Code
                                </p>

                                <div style="color:#171717; font-size:32px; font-weight:bold; letter-spacing:8px;">
                                    ${otp}
                                </div>
                            </div>

                            <p style="margin:20px 0 5px; color:#555555; font-size:14px;">
                                This verification code is valid for
                                <strong>5 minutes</strong>.
                            </p>

                            <p style="margin:15px 0 0; color:#888888; font-size:13px; line-height:1.6;">
                                If you did not request this verification code, you can safely ignore this email. Do not share this code with anyone.
                            </p>

                            <p style="margin-top:30px; color:#555555; font-size:14px;">
                                Best regards,<br/>
                                <strong style="color:#171717;">Team Eventra</strong>
                            </p>
                        </div>

                        <div style="padding:20px 30px; background-color:#f8f9fb; border-top:1px solid #eeeeee; text-align:center;">
                            <p style="margin:0 0 8px; color:#777777; font-size:12px;">
                                Making every event memorable.
                            </p>
                            <p style="margin:0; color:#aaaaaa; font-size:11px;">
                                This is an automated email. Please do not reply.
                            </p>
                            <p style="margin:12px 0 0; color:#aaaaaa; font-size:11px;">
                                &copy; ${new Date().getFullYear()} Eventra. All rights reserved.
                            </p>
                        </div>

                    </div>
                </div>
            `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${userEmail} for ${type}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

module.exports = { sendBookingEmail, sendOTPEmail };
