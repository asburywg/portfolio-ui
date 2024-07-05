import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { formatDate, formatCurrency } from '../Utils.js'
import { TransactionContext } from '../context/TransactionContext';
import { FilterMatchMode } from 'primereact/api';
import { MultiSelect } from 'primereact/multiselect';
const _ = require("lodash");

const TransactionsTable = ({ paginate = true, rows = 50, filterable }) => {
  const { transactions,
    accounts
  } = useContext(TransactionContext);

  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);


  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);


  const filterTransactions = (account) => {
    const start = new Date();
    setSelectedAccounts(account)
    const filtered = _.filter(transactions, (tns) => _.includes(account, tns.account));
    setFilteredTransactions(filtered);
    const end = new Date();
    console.log(end - start);
  };

  const renderHeader = () => {
    return (
      <MultiSelect
        className="custom-multi-select"
        value={selectedAccounts}
        options={accounts.map(acc => ({ label: acc, value: acc }))}
        onChange={(e) => filterTransactions(e.value)}
        maxSelectedLabels={1} placeholder="Select Accounts"
        resetFilterOnHide={true} filter filterPlaceholder='Search' />
    );
  };


  // TODO fix scrollbar
  return (
    <DataTable className="lightfont h-full min-h-full w-full" size='small' scrollable scrollHeight="100%"
      value={filteredTransactions} dataKey="id" sortField='date' sortOrder={1} removableSort sortMode="multiple"
      paginator={paginate} rows={rows}
      header={filterable ? renderHeader() : undefined}
      globalFilterFields={['description', 'category', 'tags', 'notes', 'amount']}
    >
      <Column field="date" header="Date" sortable style={{ width: '15%' }} body={(row) => formatDate(row.date)}></Column>
      <Column field="account" header="Account" sortable style={{ width: '15%' }}></Column>
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