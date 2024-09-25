import connectionPool from "../Dbconfig";
import wrapTransactionRepositoryAspect from "./wrapTransaction";
import {Pool} from "mysql2/promise";

const pool : Pool = connectionPool

export function Transactional(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        const connection= await pool.getConnection();
        try {
            await connection.beginTransaction();
            wrapTransactionRepositoryAspect(this, connection);
            const result = await original.apply(this, args);
            await connection.commit();
            return result;
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    };
    return descriptor;
}