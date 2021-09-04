import {AppError, ErrorCode} from '../../../utils/appError';
import {checkValidRefresh, decodeToken, IJWTToken} from '../../../utils/jwt';
import {Redis} from '../../../utils/redis';

import env from '../../../env';

import SessionService from '../../session/v1.0';
import UserService from '../../user/v1.0';

const validateTokens = (accessToken: string, refreshToken: string) => {
  try {
    const isValid = checkValidRefresh(accessToken, refreshToken);
    if (!isValid) {
      throw new AppError(ErrorCode.Sessions.InvalidRefresh);
    }
  } catch (error) {
    throw new AppError(ErrorCode.Sessions.InvalidRefresh);
  }
};

const validateSession = async (accessToken: string) => {
  const sessionInfo = await decodeToken(accessToken);

  const redis = Redis.getInstance();

  redis.get(sessionInfo.usr, (err, result) => {
    if (err || !result) {
      throw new AppError(ErrorCode.Sessions.InvalidRefresh);
    }
  });
};

const refreshSession = async (accessToken: string) => {
  const sessionInfo = await decodeToken(accessToken);
  const user = await UserService.show({
    userID: sessionInfo.usr,
  });

  if (user) {
    const jwtToken = await SessionService.create({
      user,
    });
    return jwtToken;
  }

  throw new AppError(ErrorCode.Sessions.InvalidRefresh);
};

const updateSession = async (accessToken: string, jwtToken: IJWTToken) => {
  const sessionInfo = await decodeToken(accessToken);

  const redis = Redis.getInstance();
  redis.setex(
    sessionInfo.usr,
    30 * env.SESSION_EXPIRES_IN,
    JSON.stringify(jwtToken),
  );
};

const refresh = async (accessToken: string, refreshToken: string) => {
  await validateTokens(accessToken, refreshToken);
  await validateSession(accessToken);

  try {
    const newJWT = await refreshSession(accessToken);
    await updateSession(accessToken, newJWT);

    return newJWT;
  } catch (error: any) {
    throw new AppError(ErrorCode.Sessions.InvalidRefresh, error.message);
  }
};

export default refresh;
