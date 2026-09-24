 import loginModel from "../models/login.mjs";
import redisClient from "../config/redisConnect.mjs";  

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const storedOTP = await redisClient.get(`otp:${email}`);

    if (!storedOTP || storedOTP !== otp.trim()) {
      return res.status(200).json({ message: "Invalid or expired OTP", status:400 });
    }
    await redisClient.setEx(`reset_verified:${email}`, 600, "true");
    await redisClient.del(`otp:${email}`);
    return res.status(200).json({ message: "OTP verified successfully. Proceed to reset password." });
  } catch (err) {
    return res.status(500).json({ message: "Error verifying OTP", error: err.message });
  }
};
export default verifyOTP;