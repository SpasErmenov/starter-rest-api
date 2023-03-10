import dotenv from 'dotenv';

const result = dotenv.config();
const PORT = result.parsed.PORT;
const DB_HOST = result.parsed.HOST;
const DB_PORT = result.parsed.DB_PORT;
const DB_USER = result.parsed.USER;
const DB_PASS = result.parsed.PASSWORD;
const DATABASE = result.parsed.DATABASE;

const SECRET = 'this is secret';

export {
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DATABASE,
    SECRET,
  };