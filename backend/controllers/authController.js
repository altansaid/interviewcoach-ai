const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
const sendEmail = require("../utils/sendEmail");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// JWT Token üretme
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Kayıt olma
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Giriş yapma
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Kullanıcı profili
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Google ile giriş
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ message: "No credential" });

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture, sub } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: await bcrypt.hash(sub, 10), // dummy hash
        profileImageUrl: picture,
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(401).json({ message: "Google auth failed", error: err.message });
  }
};

// Şifremi unuttum – Mail gönder
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No user found with this email" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 dk
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
    <h2 style="color: #333;">🔐 Password Reset Request</h2>
    
    <p style="font-size: 16px; color: #555;">
      Hi there,
    </p>

    <p style="font-size: 16px; color: #555;">
      We received a request to reset your password for your <strong>InterviewCoach AI</strong> account.
      If you made this request, click the button below to reset your password. This link is valid for <strong>15 minutes</strong>.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetUrl}" style="background-color: #007BFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;" target="_blank">
        Reset My Password
      </a>
    </div>

    <p style="font-size: 14px; color: #999;">
      If you did not request a password reset, please ignore this email. Your account will remain secure.
    </p>

    <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />

    <p style="font-size: 12px; color: #bbb;">
      &copy; ${new Date().getFullYear()} InterviewCoach AI. All rights reserved.
    </p>
  </div>
`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html,
    });

    res.status(200).json({ message: "Reset link sent to your email." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send reset link", error: err.message });
  }
};

// Şifre sıfırlama – Kullanıcı yeni şifre belirliyor
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to reset password", error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  googleLogin,
  forgotPassword,
  resetPassword,
};
