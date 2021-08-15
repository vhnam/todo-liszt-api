import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = parseInt(process.env.PORT!);
export const DATABASE_URL = process.env.DATABASE_URL!;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
export const SESSION_EXPIRES_IN = parseInt(process.env.SESSION_EXPIRES_IN!);

export const REDIS_HOST = process.env.REDIS_HOST!;
export const REDIS_PORT = parseInt(process.env.REDIS_PORT!);

export const EMAIL_EXPIRES_IN = parseInt(process.env.EMAIL_EXPIRES_IN!);
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME!;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!;

export const WEB_APP = process.env.WEB_APP!;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!;

export const MAX_THUMBNAIL_SIZE = parseInt(process.env.MAX_THUMBNAIL_SIZE!);
export const IMG_TYPES = process.env.IMG_TYPES!;
