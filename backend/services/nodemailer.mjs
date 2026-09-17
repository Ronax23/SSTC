import nodemailer from "nodemailer";
import {getAccountLockedTemplate} from "../templates/accLockTemp.mjs";
import {getInvoiceEmailTemplate} from "../templates/invoiceTemp.mjs";
import {getOtpTemplate} from "../templates/otpTemplate.mjs";
import {getWelcomeTemplate} from "../templates/welcomeTemplate.mjs";


const mailType={
  OTP: ({otp, name}) => {
    return {
      subject: "Password Reset Request",
      html: getOtpTemplate(otp, name),
    };
  },
  WELCOME: ({name}) => {
    return {
      subject: "Welcome to Our Family!",
      html: getWelcomeTemplate(name),
    };
  },
  ACCOUNT_LOCKED: () => {
    const unlockTime="5 Minutes",supportEmail=process.env.YAHOO_USERNAME;
    return {
      subject: "Account Locked Notification",
      html: getAccountLockedTemplate( unlockTime, supportEmail),
    }
  },
  INVOICE: ({name, invoiceNumber, date, amount}) => {
    return {
      subject: "Your Invoice Details",
      html: getInvoiceEmailTemplate(name, invoiceNumber, date, amount),
    };
  },
}

const transporter = nodemailer.createTransport({
  service: "Yahoo", // Use any Service ID from the table below (case-insensitive)
  auth: {
    user: process.env.YAHOO_USERNAME,
    pass: process.env.YAHOO_APP_PASS,
  },
});

const sendMail = async ({to,type,data,attachments},res) => {
  try {
    const Options = mailType[type];
    if (!Options) {
      throw new Error(`Invalid email type: ${type}`);
    }
    const {subject,html}=Options(data);
    const mailOptions={
      from: process.env.YAHOO_USERNAME,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments || [],
    }
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true, 
      message: `${type} email sent successfully` });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
};
export default sendMail;