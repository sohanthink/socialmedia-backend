const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const clientId = process.env.MAILING_CLIENT_ID;
const clientSecret = process.env.MAILING_CLIENT_SECRET;
const refreshToken = process.env.MAILING_REFRESH_TOKEN;
const redirectUri = "https://developers.google.com/oauthplayground/"; // Replace if needed
const email = process.env.MAIL;

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);

oAuth2Client.setCredentials({ refresh_token: refreshToken });

async function sendEmail(email, name, url) {
  const accessToken = await oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "sohanthink@gmail.com", // Replace with your sender email
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  });

  const mailOptions = {
    from: "sohanthink@gmail.com", // Replace with your sender email
    to: email,
    subject: "Verification Email",
    html: `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Email Template</title> <style> body { margin: 0; padding: 0; background-color: #EDF2F7; font-family: Arial, sans-serif; } .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden; } .header { padding: 20px; text-align: center; background-color: #26252f; color: #ffffff; } .header img { width: 50px; } .content { padding: 20px; } .content p { margin: 0 0 10px; line-height: 1.6; color: #333333; } .content p a { word-break: break-all; } .button-container { text-align: center; margin: 20px 0; } .button { background-color: #0eb456; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; } .divider { border-top: 1px solid #dddddd; margin: 20px 0; } .footer { padding: 10px; text-align: center; background-color: #26252f; color: #ffffff; font-size: 12px; } </style></head><body> <div class="email-container"> <div class="header"> <img src="https://sohanthink.com/images/logo%20icon%20white%20version.png" alt="Logo"> </div> <div class="content"> <p>Welcome ${name} to Sohans Social Application!</p> <p>We are excited to have you on board. Below is your Account verification:</p> <div class="button-container"> <a href="${url}" class="button">verify account</a> </div> <p>If you did not request to verify, please ignore this email.</p> <p> If you're having trouble clicking the "verify account" button, copy and paste the URL below into your web browser: <a href="${url}">${url}</a> </p> <p>Thank you for choosing SohansApp!</p> </div> <div class="divider"></div> <div class="footer"> <p>&copy; 2024 sohanthink.com. All rights reserved.</p> </div> </div></body></html>`,
  };

  try {
    const info = await transport.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// sendEmail(
//   "recipient@example.com",
//   "Test Email",
//   "This is a test email from Nodemailer with Google OAuth2."
// );

module.exports = sendEmail;
