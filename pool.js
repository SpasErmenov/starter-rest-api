import mariadb from 'mariadb';

import {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DATABASE,   
} from './config/config-constants.js';

const pool = mariadb.createPool({
    host: DB_HOST,
  
    port: DB_PORT,
  
    user: DB_USER,
  
    password: DB_PASS,
  
    database: DATABASE,
  
    connectionLimit: 2,
  });

export default pool;