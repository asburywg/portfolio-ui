import {TabView, TabPanel} from "../layout/Tabs.js";
import {TransactionsTable} from "../components/TransactionsTable.js"
import { TransactionProvider } from '../context/TransactionContext';

export default function Transactions() {

    return (
        <TransactionProvider>
            <TabView>
                <TabPanel header="Mint">
                    {/* style={{margin: '0 auto'}} */}
                    {/* <div className=" flex flex-1 border-solid border-4"> */}
                    {/* <div className="flex  border-solid border-4 "> */}
                        {/* <TransactionsTable /> */}
                        
                    {/* </div> */}
                    
                    {/* </div> */}
                    

                    {/* <div className="flex justify-center mt-10">
                        <TransactionsTable />
                    </div> */}

                    {/* <div className="flex justify-center w-full h-full border-solid border-4"> */}
                        {/* <div className="flex"> */}
                            {/* <h3>test</h3> */}
                            {/* <TransactionsTable /> */}
                        {/* </div> */}
                    {/* </div> */}
                    

                </TabPanel>
                <TabPanel header="Rollup Explorer">
                    <div>test</div>
                </TabPanel>
            </TabView>
        </TransactionProvider>
    )
}