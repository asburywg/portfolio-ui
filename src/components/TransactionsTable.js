import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { formatDate, formatCurrency } from '../Utils.js'
import { useTransactionContext } from '../context/TransactionContext';

const TransactionsTable = () => {

    const { transactions, error } = useTransactionContext();

    if (error) {
        return <p>Error: {error}</p>;
      }
    //   body={(row) => formatDate(row.date)}
    return (
        <DataTable value={transactions} dataKey="id" size='small' scrollable scrollHeight="100%" style={{width:'100%', minHeight:'100%', height: '100%'}} sortField='date' sortOrder={1}>
            <Column field="date" header="Date" sortable style={{width: '15%'}}></Column>
            <Column field="account" header="Account" sortable style={{width: '15%'}}></Column>
            <Column field="description" header="Description" sortable style={{width: '45%'}}></Column>
            <Column field="category" header="Category" sortable style={{width: '20%'}}></Column>
            <Column field="amount" header="Amount" sortable body={(row)=>formatCurrency(row.amount)} style={{textAlign: 'right', width: '5%'}}></Column>
          </DataTable>
    );
}


function TransactionsTableFullSort() {
    return <div>test1</div>;
}

export {
	TransactionsTableFullSort,
	TransactionsTable,
};