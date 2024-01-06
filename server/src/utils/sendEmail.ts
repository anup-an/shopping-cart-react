import sendGridMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import { ErrorCode, ErrorException } from '.';

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const sendEmail = async (email: string, subject: string, content: string) => {
  try {
    const smtpTransport = nodemailer.createTransport({
      host: 'mail.smtp2go.com',
      port: 2525, // 8025, 587 and 25 can also be used.
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const info = await smtpTransport.sendMail({
      from: 'anup.poudel@bookslibrary.app',
      to: email,
      subject: subject,
      html: content,
    });
  } catch (error) {
    throw new ErrorException(ErrorCode.ServerError, 'Unable to send email');
  }
};

export default sendEmail;
