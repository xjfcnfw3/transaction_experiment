import {Connection} from "mysql2/promise";

export default class BookRepositoryV1 {

    public async save(name : string, connection: Connection) {
        await connection.query("INSERT INTO BOOK (name) VALUES (?)", [name]);
    }

    public async findAllBooks(connection: Connection) {
        return connection.query("SELECT * FROM BOOK");
    }
}