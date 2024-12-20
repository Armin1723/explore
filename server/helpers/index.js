require("dotenv").config();
const nodemailer = require("nodemailer");

const sendMail = async ( email, subject, message ) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: subject,
      html:
       message
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent -", info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendMail };
