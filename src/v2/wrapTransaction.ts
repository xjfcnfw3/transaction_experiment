import {Connection} from "mysql2/promise";
import TransactionRepository from "./TransactionalRepository";

function wrapTransaction(target: any, connection: Connection) {
    const wrappedTransaction = target.transaction;
    target.transaction = async (...args: any[]) => {
        return await wrappedTransaction.apply(target, [...args, connection]);
    };
}

export default function wrapTransactionRepositoryAspect(target: any, connection: Connection) {
    Object.keys(target).forEach(key => {
        if (target[key] instanceof TransactionRepository) {
            wrapTransaction(target[key], connection);
        }
    })
}