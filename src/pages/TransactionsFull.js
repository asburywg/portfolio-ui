import { TransactionsTable } from "../components/TransactionsTable.js"
import { TransactionProvider } from '../context/TransactionContext';

export default function TransactionsFull() {

    return (
        <TransactionProvider>
            <div className="flex flex-col h-screen w-full">
                <div className="h-full flex w-5/6 overflow-x-hidden m-20">
                    <TransactionsTable filterable />
                </div>
            </div>
        </TransactionProvider>
    )
}