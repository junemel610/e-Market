const inMemoryStore = {}; // Temporary in-memory store for codes
const verifiedStore = {}; // Emails that completed code verification
const nodemailer = require('nodemailer');
const User = require('../models/Login');

// Create a Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp@gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, verificationCode) => {
    const mailOptions = {
      from: {
        name: 'Nebula Recovery',
        address: 'nebularecovery@gmail.com',
      },
      to: email,
      subject: 'Password Reset Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Rethrow the error to be caught in the calling function
    }
  };
  

  exports.sendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Email not found in the database.' });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        await sendVerificationEmail(email, verificationCode);
        inMemoryStore[email] = { code: verificationCode, expiresAt: Date.now() + 10 * 60 * 1000 };
        delete verifiedStore[email];
        return res.json({ success: true, message: 'Verification code sent successfully.' });
    } catch (error) {
        console.error('Error sending verification code:', error);
        return res.json({ success: false, message: 'Failed to send verification code.' });
    }
};


exports.verifyCode = async (req, res) => {
    const { email, code } = req.body;
    const stored = inMemoryStore[email];
    if (!stored || stored.expiresAt < Date.now()) {
        delete inMemoryStore[email];
        delete verifiedStore[email];
        return res.json({ success: false, message: 'Invalid verification code.' });
    }
    if (stored.code !== Number(code)) {
        return res.json({ success: false, message: 'Invalid verification code.' });
    }

    verifiedStore[email] = stored.expiresAt;
    delete inMemoryStore[email];
    res.json({ success: true, message: 'Verification code is valid.' });
};

  exports.resetPassword = [
    async (req, res) => {
      try {
        const { email, password, confirmPassword } = req.body;
        const verifiedUntil = verifiedStore[email];
        if (!verifiedUntil || verifiedUntil < Date.now()) {
          delete verifiedStore[email];
          return res.status(403).json({ success: false, message: 'Verify the emailed code before resetting your password.' });
        }

        const user = await User.findOne({ email });
  
        if (!user) {
          return res.json({ success: false, message: 'Email not found in the database.' });
        }
  
        if (typeof password !== 'string' || password.trim().length < 8 || password.length > 255) {
          return res.status(400).json({ success: false, message: 'Password must be between 8 and 255 characters.' });
        }
  
        if (password !== confirmPassword) {
          return res.json({ success: false, message: 'Passwords do not match.' });
        }
  
        user.password = password;
        await user.save();
        delete verifiedStore[email];
        delete inMemoryStore[email];
        res.json({ success: true, message: 'Password reset successful.' });
      } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
      }
    }
  ];
