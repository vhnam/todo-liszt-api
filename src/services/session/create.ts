import {createToken} from '../../utils/jwt';

import {UserModel} from '../../models/UserModel';

interface ICreate {
  user: UserModel;
}

class Create {
  private _user: UserModel;

  constructor({user}: ICreate) {
    this._user = user;
  }

  async exec() {
    const token = await createToken(this._user);
    return token;
  }
}

const create = (params: ICreate) => {
  return new Create(params).exec();
};

export default create;
