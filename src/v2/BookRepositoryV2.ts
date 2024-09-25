import {Connection} from "mysql2/promise";
import TransactionRepository from "./TransactionalRepository";

export default class BookRepositoryV2 extends TransactionRepository{


    public async save(name : string) {
        await this.transaction((connection : Connection) => {
            connection.query("INSERT INTO BOOK (name) VALUES (?)", [name]);
        })
    }

    public async findAllBooks() {
        return this.transaction((connection : Connection) => {
            return connection.query("SELECT * FROM BOOK");
        })
    }
}