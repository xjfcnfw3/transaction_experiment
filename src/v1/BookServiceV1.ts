import BookRepositoryV1 from "./BookRepositoryV1";
import {Connection, Pool} from "mysql2/promise";

export default class BookServiceV1 {

    constructor(private readonly bookRepository: BookRepositoryV1,
                private readonly connectionPool: Pool) {
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

    public async save(name : string) : Promise<void> {
        await this.doTransaction((connection : Connection) => {
            return this.bookRepository.save(name, connection);
        })
    }

    public async findAll(): Promise<any[]> {
        return this.doTransaction((connection : Connection) => this.bookRepository.findAllBooks(connection));
    }
}