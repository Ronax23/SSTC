import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Yahoo", // Use any Service ID from the table below (case-insensitive)
  auth: {
    user: process.env.YAHOO_USERNAME,
    pass: process.env.YAHOO_APP_PASS,
  },
});

const mailOptions = (to,uName,otp) => {
  return {
    from: process.env.YAHOO_USERNAME,
    to: to,
    subject: "Password Reset Request",
    // text: `Hi,You have requested to reset your password. Your OTP is ${otp}.`,
    html: `<p>Hi ${uName},</p><p>You have requested to reset your password.<br> Your OTP is <b>${otp}</b>.</p>`,
  };
};
const sendMail = async (to, otp, uName) => {
  try {
    await transporter.sendMail(mailOptions(to, uName, otp));
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
};
export default sendMail;