const express = require("express");
const { registerUser, loginUser, getUserProfile, googleLogin, forgotPassword,
  resetPassword, } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);   // Register User
router.post("/login", loginUser);         // Login User
router.get("/profile", protect, getUserProfile);  // Get User Profile
router.post("/google", googleLogin)

// 🔸 Şifre sıfırlama endpoint'leri
router.post("/forgot-password", forgotPassword); // Mail gönder
router.post("/reset-password/:token", resetPassword); // Yeni şifreyi kaydet


router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
