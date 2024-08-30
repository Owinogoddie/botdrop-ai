import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export const sendVerificationEmail = async (to: string, code: string) => {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: "Verify your email",
      text: `Your verification code is: ${code}. This code will expire in 1 hour.`,
      html: `<p>Your verification code is: <strong>${code}</strong>. This code will expire in 1 hour.</p>`,
    });
  };