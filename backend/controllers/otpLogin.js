import fs from "fs";
import jwt from "jsonwebtoken";
import transporter from "../config/emailTransporter.js";

// Send OTP to any emailre
export const sendLoginOtp = async (req, res) => {
  const  { name }  =  req.body;

  try {
    console.log("📩 Request received to send OTP to:", email);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("🔢 Generated OTP:", otp);

    fs.writeFileSync(`otp-login-${name}.txt`, otp, "utf-8");
    console.log("📁 OTP written to file:", `otp-login-${email}.txt`);

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: "vivekdixit504@gmail.com",
      subject: "Your OTP for Login",
      html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    });

    console.log("✅ OTP email sent successfully to:", email);
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("❌ Failed to send OTP:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};


// Verify OTP and generate 1hr JWT login
export const verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    console.log("🛡️ Verifying OTP for:", email);
    const storedOtpPath = `otp-login-${email}.txt`;

    if (!fs.existsSync(storedOtpPath)) {
      console.warn("⚠️ OTP file does not exist:", storedOtpPath);
      return res.status(410).json({ error: "OTP expired or not requested" });
    }

    const storedOtp = fs.readFileSync(storedOtpPath, "utf-8");
    console.log("📤 OTP from file:", storedOtp);
    console.log("📥 OTP received from client:", otp);

    if (storedOtp !== otp) {
      console.warn("❌ OTP mismatch");
      return res.status(401).json({ error: "Invalid OTP" });
    }

    fs.unlinkSync(storedOtpPath);
    console.log("🗑️ OTP file deleted after successful match");

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("🔐 JWT generated successfully for:", email);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { email },
    });
  } catch (err) {
    console.error("❌ Error in OTP verification:", err);
    res.status(500).json({ error: "Login failed" });
  }
};
