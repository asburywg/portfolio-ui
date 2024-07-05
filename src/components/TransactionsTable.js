import React, { useState, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { formatDate, formatCurrency } from '../Utils.js'
import { TransactionContext } from '../context/TransactionContext';
import { FilterMatchMode } from 'primereact/api';
import { MultiSelect } from 'primereact/multiselect';


const TransactionsTable = ({ paginate = true, rows = 50, filterable }) => {
  const ctx = useContext(TransactionContext);
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  const [filters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    account: { value: null, matchMode: FilterMatchMode.IN }
});

  // useEffect(() => {
  //   ctx.filterTransactions(selectedAccounts);
  // }, [selectedAccounts]);


  const header = (
    <span >
      <MultiSelect transitionOptions={{ disabled: true }} 
      value={selectedAccounts} 
      options={ctx.accounts.map(acc => ({ label: acc, value: acc }))} 
      onChange={(e)=>setSelectedAccounts(e.value)} 
      maxSelectedLabels={1} placeholder="Select Accounts" resetFilterOnHide={true} filter />
    </span>
  );

  // TODO faster than custom, account is slower, custom gives flexibility for more filters / formatting
  const accountFilterTemplate = (options) => {
    console.log(options);
    return (
        <MultiSelect
            value={options.value}
            options={ctx.accounts.map(acc => ({ label: acc, value: acc }))}
            onChange={(e) => options.filterApplyCallback(e.value)}
            placeholder="Select Accounts"
            className="p-column-filter"
            maxSelectedLabels={1}
            style={{ minWidth: '14rem' }}
        />
    );
  };

  // TODO fix scrollbar
  return (
    <DataTable className="lightfont h-full min-h-full w-full" size='small' scrollable scrollHeight="100%"
      value={ctx.filteredTransactions} dataKey="id" sortField='date' sortOrder={1} removableSort sortMode="multiple"
      paginator={paginate} rows={rows}
      header={filterable ? header : undefined}
      globalFilterFields={['description', 'category', 'tags', 'notes', 'amount']}
      filters={filters} filterDisplay="row">
      <Column field="date" header="Date" sortable style={{ width: '15%' }} body={(row) => formatDate(row.date)}></Column>
      

      <Column field="account" filterField="account" filter filterElement={accountFilterTemplate} filterMenuStyle={{ width: '14rem' }} showFilterMenu={false} header="Account" sortable style={{ width: '15%' }}></Column>
      
      
      <Column field="description" header="Description" sortable style={{ width: '45%' }}></Column>
      <Column field="category" header="Category" sortable style={{ width: '20%' }}></Column>
      <Column field="amount" header="Amount" sortable body={(row) => formatCurrency(row.amount)} style={{ textAlign: 'right', width: '5%' }}></Column>
      <Column expander={true} style={{ width: '6rem' }} />
    </DataTable>
  );
}

export {
  TransactionsTable,
};