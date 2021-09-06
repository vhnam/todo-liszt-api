import {UploadApiResponse} from 'cloudinary';
import {Op} from 'sequelize';

import {Cloudinary} from '../../../utils/cloudinary';

import {User} from '../../../models';

interface IUpdateAvatar {
  file: Express.Multer.File;
  userID: string;
}

const updateAvatar = async (params: IUpdateAvatar) => {
  const cloudinaryResponse: UploadApiResponse =
    await Cloudinary.uploader.upload(params.file.path);

  await User.update(
    {
      avatar: cloudinaryResponse.secure_url,
    },
    {
      where: {
        [Op.or]: [{id: params.userID}],
      },
      individualHooks: true,
    },
  );
};

export default updateAvatar;
