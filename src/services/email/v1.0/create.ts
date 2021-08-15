import nodemailer from 'nodemailer';

import {EMAIL_PASSWORD, EMAIL_USERNAME} from '../../../config';

import {AppError, ErrorCode} from '../../../utils/appError';

interface ICreate {
  from: string;
  to: string;
  subject: string;
  html: string;
}

class Create {
  private _params: ICreate;
  private _transporter: nodemailer.Transporter;

  constructor(params: ICreate) {
    this._params = params;
    this._transporter = nodemailer.createTransport(
      `smtps://${EMAIL_USERNAME}:${EMAIL_PASSWORD}@smtp.gmail.com`
    );
  }

  async _send() {
    return new Promise((resolve, reject) => {
      this._transporter.sendMail(this._params, (error, info) => {
        if (error) {
          reject(error);
        }
        resolve(info);
      });
    });
  }

  async exec() {
    try {
      await this._send();
    } catch (error) {
      throw new AppError(ErrorCode.General.InternalServerError, [
        error.message,
      ]);
    }
  }
}

const create = (params: ICreate) => {
  return new Create(params).exec();
};

export default create;
