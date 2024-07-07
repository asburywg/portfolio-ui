import React, { useState, useContext, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { formatDate, formatCurrency } from '../Utils.js'
import { TransactionContext } from '../context/TransactionContext';
import { MultiSelect } from 'primereact/multiselect';
import { TransactionsMetadata } from './subcomponents/TransactionMetadata.js';
import { Dropdown } from "primereact/dropdown";
const _ = require("lodash");

const TransactionsTable = ({ paginateRows = 40, filterable }) => {
  const { transactions, accounts, categories, updateCategory } = useContext(TransactionContext);

  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  const [expandedRow, setExpandedRow] = useState([]);


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

  // METADATA ROW EXPANSION 
  const toggleRow = (e) => {
    if (expandedRow[0] === e.data) {
      setExpandedRow([]);
    } else {
      setExpandedRow([e.data])
    }
  };

  const renderRowMetadata = (row) => {
    return (
      <TransactionsMetadata transaction={row} collapse={setExpandedRow} />
    );
  };

  // CATEGORY EDITOR
  const groupCategories = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.optionGroup.name}</div>
      </div>
    );
  };

  const categoryEditor = (props) => {
    console.log(categories)
    return (
      <Dropdown
        appendTo={"self"}
        value={props.value}
        onChange={(e) => props.editorCallback(e.value)}
        options={categories}
        optionLabel="name"
        filter
        autoFocus
        optionGroupLabel="name"
        optionGroupChildren="subcategories"
        optionGroupTemplate={groupCategories}
        placeholder={props.value}
      />
    );
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field } = e;
    if (newValue["name"] !== undefined) {  // prevent current category from being lost on dropdown clickoff
      updateCategory(rowData.id, newValue.name);
      rowData[field] = newValue.name;
    } else {
      rowData[field] = newValue;
    }
  };


  return (
    <DataTable className="lightfont h-full min-h-full w-full" size='small' scrollable scrollHeight="100%"
      value={filteredTransactions} dataKey="id" sortField='date' sortOrder={1} removableSort sortMode="multiple"
      paginator rows={paginateRows}
      header={undefined} editMode='cell'
      onRowExpand={(e) => { toggleRow(e) }} expandedRows={expandedRow} rowExpansionTemplate={renderRowMetadata}
      globalFilterFields={['description', 'category', 'tags', 'notes', 'amount']}
    >
      <Column field="date" header="Date" sortable style={{ width: '15%' }} body={(row) => formatDate(row.date)}></Column>
      <Column field="account" header="Account" sortable style={{ width: '15%' }}></Column>
      <Column field="description" header="Description" sortable style={{ width: '45%' }}></Column>
      <Column field="category" header="Category" sortable editor={categoryEditor} onCellEditComplete={onCellEditComplete} style={{ width: '20%' }}></Column>
      <Column field="amount" header="Amount" sortable body={(row) => formatCurrency(row.amount)} style={{ textAlign: 'right', width: '5%' }}></Column>
      <Column expander={true} style={{ width: '6rem' }} />
    </DataTable>
  );
}

export {
  TransactionsTable,
};