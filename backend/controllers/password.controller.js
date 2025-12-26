import User from "../models/User.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

// -------------------- 1. SEND CODE --------------------
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetCode = code;
  user.resetCodeExpire = Date.now() + 10 * 60 * 1000; // 10 min
  await user.save();

  await sendEmail({
    to: email,
    subject: "Password Reset Code",
    html: `<h2>Your OTP is ${code}</h2><p>Valid for 10 minutes</p>`,
  });

  res.json({ message: "Reset code sent to email" });
};

// -------------------- 2. VERIFY CODE --------------------
export const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({
    email,
    resetCode: code,
    resetCodeExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }

  res.json({ message: "Code verified" });
};

// -------------------- 3. RESET PASSWORD --------------------
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  user.resetCode = undefined;
  user.resetCodeExpire = undefined;

  await user.save();

  res.json({ message: "Password reset successful" });
};
