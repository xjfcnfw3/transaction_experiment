import dotenv from "dotenv";
import mysql, {PoolOptions} from 'mysql2/promise';
import path from "path";

dotenv.config({path: path.join(import.meta.dirname, './.env')});

const access: PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    connectionLimit: 10,
    queueLimit: 0
}

const connectionPool = mysql.createPool(access);

export default connectionPool;
