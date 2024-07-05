import { TabView, TabPanel } from "../layout/Tabs.js";
import { TransactionsTable } from "../components/TransactionsTable.js"
import { TransactionProvider } from '../context/TransactionContext';

export default function Transactions() {

    return (
        <TransactionProvider>
            <TabView>
                <TabPanel header="Mint">

                    <div className="h-5/6 w-5/6 mx-auto mt-5">
                        <TransactionsTable />
                    </div>

                </TabPanel>
                <TabPanel header="Rollup Explorer">
                    <div className="h-5/6 w-5/6 mx-auto mt-2">
                        <TransactionsTable filterable />
                    </div>
                </TabPanel>
            </TabView>
        </TransactionProvider>
    )
}