import path from 'path';

const defaultProps: Record<string, any> = {
  CONFIG_PATH: path.resolve(process.cwd(), '.env'),

  PORT: 4000,
  WEB_APP: '',

  ACCESS_TOKEN_SECRET: '',
  REFRESH_TOKEN_SECRET: '',
  SESSION_EXPIRES_IN: 0,

  MAX_THUMBNAIL_SIZE: 20,
  IMG_TYPES: 'png,jpg',
};

export default defaultProps;
