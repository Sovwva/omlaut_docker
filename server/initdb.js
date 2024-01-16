import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg'

const dbConfig = {
    user: process.env.DATABASE_USER || process.env.default_DATABASE_USER,
    password: process.env.DATABASE_PASSWORD || process.env.default_DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST || process.env.default_DATABASE_HOST,
    database: process.env.DATABASE_NAME || process.env.default_DATABASE_NAME,
    port: 5432, // Порт, на котором запущен PostgreSQL
}

console.log(dbConfig)

const pool = new pg.Pool(dbConfig);

export default pool