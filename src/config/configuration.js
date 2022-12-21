import dotenv from "dotenv";
dotenv.config();

export default {
    ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_PORT: process.env.DATABASE_PORT,
    APP_NAME: process.env.APP_NAME,
    APP_PORT: process.env.APP_PORT,
    NODE_ENV: process.env.NODE_ENV,
}