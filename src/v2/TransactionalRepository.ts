import {Connection} from "mysql2/promise";

export default class TransactionRepository {
    public async transaction(task: Function, connection?: Connection): Promise<any[]> {
        return await task(connection)
    }
}