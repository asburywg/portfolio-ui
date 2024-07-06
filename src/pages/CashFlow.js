import Sankey from "../components/diagrams/Sankey.js";
import { TabView, TabPanel } from "../layout/Tabs.js";

export const data = {"nodes": [{"name": "Income", "category": "Income"}, {"name": "Leisure", "category": "Leisure"}, {"name": "Living", "category": "Living"}, {"name": "Expenses", "category": "Expenses"}, {"name": "Interest Income", "category": "Income"}, {"name": "Misc Income", "category": "Income"}, {"name": "Paycheck", "category": "Income"}, {"name": "Clothing", "category": "Leisure"}, {"name": "Convenience", "category": "Leisure"}, {"name": "Food & Dining", "category": "Leisure"}, {"name": "Shopping", "category": "Leisure"}, {"name": "Travel", "category": "Leisure"}, {"name": "Altis Rent", "category": "Living"}, {"name": "Altis Utilities & Cost", "category": "Living"}, {"name": "Bills & Subscriptions", "category": "Living"}, {"name": "Gas & Fuel", "category": "Living"}, {"name": "Groceries", "category": "Living"}, {"name": "Misc Expenses", "category": "Living"}, {"name": "Uncategorized", "category": "Expenses"}, {"name": "Net Profit", "category": "Net Profit"}], "links": [{"source": "Interest Income", "target": "Income", "value": 179.57}, {"source": "Misc Income", "target": "Income", "value": 488.0}, {"source": "Paycheck", "target": "Income", "value": 7201.200000000001}, {"source": "Clothing", "target": "Leisure", "value": 60.2}, {"source": "Convenience", "target": "Leisure", "value": 70.22}, {"source": "Food & Dining", "target": "Leisure", "value": 366.97999999999996}, {"source": "Shopping", "target": "Leisure", "value": 1854.46}, {"source": "Travel", "target": "Leisure", "value": 483.25}, {"source": "Altis Rent", "target": "Living", "value": 3089.95}, {"source": "Altis Utilities & Cost", "target": "Living", "value": 70.41}, {"source": "Bills & Subscriptions", "target": "Living", "value": 308.41}, {"source": "Gas & Fuel", "target": "Living", "value": 32.22}, {"source": "Groceries", "target": "Living", "value": 183.92}, {"source": "Misc Expenses", "target": "Living", "value": 1157.54}, {"source": "Uncategorized", "target": "Expenses", "value": 34.5}, {"source": "Living", "target": "Expenses", "value": 4842.45}, {"source": "Leisure", "target": "Expenses", "value": 2714.71}, {"source": "Expenses", "target": "Net Profit", "value": 7591.66}, {"source": "Income", "target": "Net Profit", "value": 7868.77}]};



export default function CashFlow() {
  return (
    <TabView>
      <TabPanel header="Sankey">

        <div className="h-5/6 w-11/12 mx-auto mt-5">

          <Sankey data={data} width={700} height={400} />
        </div>

      </TabPanel>
    </TabView>
  )
}