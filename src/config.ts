import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = parseInt(process.env.PORT!);
export const DATABASE_URL = process.env.DATABASE_URL!;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
export const SESSION_EXPIRES_IN = parseInt(process.env.SESSION_EXPIRES_IN!);
