import sendGridMail from '@sendgrid/mail';
import { ErrorCode, ErrorException } from '.';

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const sendEmail = async (email: string, subject: string, text: string) => {
    try {
        const sender = process.env.USER_EMAIL;
        if (!sender) throw new ErrorException(ErrorCode.ServerError, 'Unable to send email');
        await sendGridMail.send({
            to: email,
            from: sender,
            subject,
            text,
        });
    } catch (error) {
        throw new ErrorException(ErrorCode.ServerError, 'Unable to send email');
    }
};

export default sendEmail;
