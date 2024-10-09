import {AsyncLocalStorage} from "node:async_hooks";
import {Connection} from "mysql2/promise";

export default class AsyncLocalConnectStorage {
    constructor(private readonly localStorage: AsyncLocalStorage<any>) {
    }

    getContextConnection() {
        const store = this.localStorage.getStore();
        return store ? store.get("connection") : null;
    }

    runTransactionWithLocalStorage(connection: Connection, callback: () => Promise<any>) {
        return this.localStorage.run(new Map([['connection', connection]]), callback);
    }
}

const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>
const localConnectionStorage = new AsyncLocalConnectStorage(asyncLocalStorage);

export function getConnectionStorage() {
    return localConnectionStorage;
}