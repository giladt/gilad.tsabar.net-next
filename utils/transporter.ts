import nodemailer from "nodemailer";

const mailer = process.env.NODEMAILER_TRANSPORTER_USER ?? '';
const user = process.env.NODEMAILER_TRANSPORTER_RECEIVER ?? '';
const pass = process.env.NODEMAILER_TRANSPORTER_PASSWORD ?? '';
const host = process.env.NODEMAILER_HOST ?? '';

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    user: mailer,
    pass
  },
  host
});

export const mailOptions: nodemailer.SendMailOptions = {
  from: 'mailer@tsabar.net',
  to: user,
}