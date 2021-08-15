import {SESSION_EXPIRES_IN} from '../../../config';

import {AppError, ErrorCode} from '../../../utils/appError';
import {checkValidRefresh, decodeToken, IJWTToken} from '../../../utils/jwt';
import {Redis} from '../../../utils/redis';

import db from '../../../models';

import SessionService from '../../session/v1.0';
import UserService from '../../user/v1.0';

class Refresh {
  private _accessToken: string;
  private _refreshToken: string;
  private _jwtToken: IJWTToken | null;

  constructor(accessToken: string, refreshToken: string) {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._jwtToken = null;
  }

  _validateTokens() {
    try {
      const isValid = checkValidRefresh(this._accessToken, this._refreshToken);
      if (!isValid) {
        throw new AppError(ErrorCode.Sessions.InvalidRefresh);
      }
    } catch (error) {
      throw new AppError(ErrorCode.Sessions.InvalidRefresh);
    }
  }

  async _validateSession() {
    const sessionInfo = await decodeToken(this._accessToken);

    const redis = Redis.getInstance();

    redis.get(sessionInfo.usr, (err, result) => {
      if (err || !result) {
        throw new AppError(ErrorCode.Sessions.InvalidRefresh);
      }
    });
  }

  async _refreshSession() {
    const sessionInfo = await decodeToken(this._accessToken);
    const user = await UserService.show({
      userID: sessionInfo.usr,
    });

    if (user) {
      const jwtToken = await SessionService.create({
        user,
      });

      this._jwtToken = jwtToken;
    }
  }

  async _updateSession() {
    const sessionInfo = await decodeToken(this._accessToken);

    const redis = Redis.getInstance();
    redis.setex(
      sessionInfo.usr,
      30 * SESSION_EXPIRES_IN,
      JSON.stringify(this._jwtToken),
    );
  }

  async exec() {
    this._validateTokens();
    await this._validateSession();

    const sessionTransaction = await db.sequelize.transaction();

    try {
      await this._refreshSession();
      await this._updateSession();
      await sessionTransaction.commit();

      return this._jwtToken;
    } catch (error) {
      await sessionTransaction.rollback();
      throw new AppError(ErrorCode.Sessions.InvalidRefresh, [error.message]);
    }
  }
}

const refresh = (accessToken: string, refreshToken: string) => {
  return new Refresh(accessToken, refreshToken).exec();
};

export default refresh;
