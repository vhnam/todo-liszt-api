import {Request} from 'express';
import multer from 'multer';

import {IMG_TYPES, MAX_THUMBNAIL_SIZE} from '../../config';

import {AppError, ErrorCode} from '../appError';

class Multer {
  private static _multer: multer.Multer;

  static getInstance() {
    if (!this._multer) {
      this._multer = multer({
        storage: multer.diskStorage({}),
        limits: {
          fileSize: MAX_THUMBNAIL_SIZE * 1024 * 1024,
        },
        fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
          const allowFileTypes = IMG_TYPES.split(',');
          if (
            allowFileTypes.some((ext) => file.originalname.endsWith(`.${ext}`))
          ) {
            return cb(null, true);
          }
          const error = new AppError(ErrorCode.General.InvalidFileFormat);
          cb(error);
        },
      });
    }

    return this._multer;
  }
}

export default Multer;
