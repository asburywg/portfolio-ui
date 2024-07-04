import {TabView, TabPanel} from "../layout/Tabs.js";
import {TransactionsTable} from "../components/TransactionsTable.js"
import { TransactionProvider } from '../context/TransactionContext';

export default function Transactions() {

    return (
        <TransactionProvider>
            <TabView>
                <TabPanel header="Mint">

                    <div className="h-full w-5/6 mx-auto">
                        <TransactionsTable />
                    </div>
                
                </TabPanel>
                <TabPanel header="Rollup Explorer">
                    <div>test</div>
                </TabPanel>
            </TabView>
        </TransactionProvider>
    )
}