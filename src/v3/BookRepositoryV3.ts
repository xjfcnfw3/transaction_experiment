import AsyncLocalConnectStorage from "./Localstorage";

export default class BookRepositoryV3 {

    constructor(private readonly connectionStorage: AsyncLocalConnectStorage) {
    }

    public async save(name : string) {
        const connection = this.connectionStorage.getContextConnection();
        connection.query("INSERT INTO BOOK (name) VALUES (?)", [name]);
    }

    public async findAllBooks() {
        const connection = this.connectionStorage.getContextConnection();
        return connection.query("SELECT * FROM BOOK");
    }
}