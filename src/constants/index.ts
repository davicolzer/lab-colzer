import * as dotenv from 'dotenv';
dotenv.config();

export const SERVER_PORT = Number(process.env.SERVER_PORT!);
export const bcryptSalt = Number(process.env.PROJECT_BCRYPT_SALT!);
export const jwtSecret = process.env.PROJECT_JWT_SECRET!;

export const db = {
  NAME: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  HOST: process.env.DB_HOST,
};
