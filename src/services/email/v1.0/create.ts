import nodemailer from 'nodemailer';

import env from '../../../env';

import {AppError, ErrorCode} from '../../../utils/appError';

interface ICreate {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const create = (params: ICreate) => {
  try {
    const transporter = nodemailer.createTransport(
      `smtps://${env.EMAIL_USERNAME}:${env.EMAIL_PASSWORD}@smtp.gmail.com`,
    );

    transporter.sendMail(params);
  } catch (error: any) {
    throw new AppError(ErrorCode.General.InternalServerError, error.message);
  }
};

export default create;
