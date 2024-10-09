import connectionPool from "../Dbconfig";
import {Pool, PoolConnection} from "mysql2/promise";
import {getConnectionStorage} from "./Localstorage";

const pool : Pool = connectionPool

export function Transactional(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    const asyncLocalConnectionStorage = getConnectionStorage();
    descriptor.value = async function (...args: any[]) {
        const connection: PoolConnection = await pool.getConnection();
        return await asyncLocalConnectionStorage.runTransactionWithLocalStorage(connection, async () => {
            try {
                await connection.beginTransaction();
                const result = await original.apply(this, args);
                await connection.commit();
                return result;
            } catch (err) {
                await connection.rollback();
                throw err;
            } finally {
                connection.release();
            }
        });
    };
    return descriptor;
}