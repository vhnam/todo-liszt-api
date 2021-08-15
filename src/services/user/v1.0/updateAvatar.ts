import {UploadApiResponse} from 'cloudinary';
import {Op} from 'sequelize';

import {Cloudinary} from '../../../utils/cloudinary';

import db from '../../../models';

interface IUpdateAvatar {
  file: Express.Multer.File;
  userID: string;
}

class UpdateAvatar {
  private _params: IUpdateAvatar;

  constructor(params: IUpdateAvatar) {
    this._params = params;
  }

  async exec() {
    const cloudinaryResponse: UploadApiResponse =
      await Cloudinary.uploader.upload(this._params.file.path);

    await db.User.update(
      {
        avatar: cloudinaryResponse.secure_url,
      },
      {
        where: {
          [Op.or]: [{id: this._params.userID}],
        },
      },
    );
  }
}

const updateAvatar = (params: IUpdateAvatar) => {
  return new UpdateAvatar(params).exec();
};

export default updateAvatar;
