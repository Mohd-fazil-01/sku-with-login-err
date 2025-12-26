import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  try {
    // 🔍 Debug: env variables check
    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
      throw new Error("EMAIL or EMAIL_PASSWORD missing in .env");
    }

    // 📬 Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true = 465, false = 587
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, // Gmail App Password
      },
    });

    // 🧪 Verify SMTP connection (very important)
    await transporter.verify();

    // ✉️ Send mail
    const info = await transporter.sendMail({
      from: `"Auth App" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return true;

  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    throw error; // controller ko error milega
  }
};

export default sendEmail;
