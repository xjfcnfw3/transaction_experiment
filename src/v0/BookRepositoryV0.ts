import {Connection, Pool} from "mysql2/promise";

export default class BookRepositoryV0 {
    constructor(private readonly connectionPool : Pool) {
    }

    private async doTransaction(task : Function) {
        const connection: any = await this.connectionPool.getConnection();
        try {
            await connection.beginTransaction();
            const result = await task(connection);
            await connection.commit();
            return result;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    public async save(name : string) {
        this.doTransaction((connection : Connection) => {
            connection.query("INSERT INTO BOOK (name) VALUES (?)", [name]);
        })
    }

    public async findAllBooks() {
        return this.doTransaction((connection : Connection) => {
            return connection.query("SELECT * FROM BOOK");
        })
    }
}