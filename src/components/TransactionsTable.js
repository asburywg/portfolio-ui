import 'primeicons/primeicons.css';
import React, { useState, useContext, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { formatDate, formatCurrency } from '../Utils.js'
import { TransactionContext } from '../context/TransactionContext';
import { MultiSelect } from 'primereact/multiselect';
import { TransactionsMetadata } from './subcomponents/TransactionMetadata.js';
import { Dropdown } from "primereact/dropdown";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Search } from "lucide-react";
import { FilterMatchMode } from 'primereact/api';

// const _ = require("lodash"); // impove performance? 

const TransactionsTable = ({ paginateRows = 40, filterable }) => {
  const { transactions, accounts, categories, rollups, updateCategory } = useContext(TransactionContext);

  // table state
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [expandedRow, setExpandedRow] = useState([]);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);


  // filters
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRollup, setSelectedRollup] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);


  // FILTERABLE

  const filterTransactions = ({ selectedTags = [], selectedAccounts = [], selectedCategories = [], selectedRollup = null }) => {
    const filtered = transactions.filter(transaction => {
      const tagFilter = selectedTags.length === 0 || transaction.tags.some(r => selectedTags.includes(r));
      const accountFilter = selectedAccounts.length === 0 || selectedAccounts.some(acc => transaction.account === acc);
      const categoryFilter = selectedCategories.length === 0 || selectedCategories.some(cat => transaction.category === cat.name);
      // const monthFilter = selectedMonth == null || transaction.month == selectedMonth;
      const rollupFilter = selectedRollup == null || transaction.rollup == selectedRollup;
      return accountFilter && tagFilter && categoryFilter && rollupFilter;
    });
    setFilteredTransactions(filtered);
  };

  // <MultiSelect
  // className="custom-multi-select"
  // value={selectedAccounts}
  // options={accounts.map(acc => ({ label: acc, value: acc }))}
  // onChange={(e) => filterTransactions(e.value)}
  // maxSelectedLabels={1} placeholder="Select Accounts"
  // resetFilterOnHide={true} filter filterPlaceholder='Search' />

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    // let _filters = { ...filters };
    // _filters['global'].value = value;
    // setFilters(_filters);
    setGlobalFilterValue(value);
  };


  const renderHeader = () => {
    return (
      <>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
          {/* <Dropdown value={selectedMonth} options={months} onChange={handleMonthChange} placeholder="Select Month" showClear /> */}
          {/* <MultiSelect value={selectedAccounts} options={accounts.map(tag => ({ label: tag, value: tag }))} onChange={handleAccountChange} maxSelectedLabels={1} placeholder="Select Accounts" resetFilterOnHide={true} filter /> */}
          {/* <MultiSelect value={selectedTags} options={tags.map(tag => ({ label: tag, value: tag }))} onChange={handleTagChange} display="chip" placeholder="Select Tags" resetFilterOnHide={true} showClear={true} filter /> */}
          {/* <Dropdown value={selectedRollup} options={rollups} onChange={handleRollupChange} placeholder="Select Rollup" showClear /> */}
          {/* <MultiSelect disabled={selectedRollup!==null} maxSelectedLabels={1} value={selectedCategories} options={categories} optionLabel="name" optionGroupLabel="name" onChange={handleCategoryChange} optionGroupChildren="subcategories" optionGroupTemplate={groupedItemTemplate} placeholder="Select Categories" resetFilterOnHide={true} filter /> */}
          {/* <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilters} /> */}
        </div>
      </div>
      </>
    )
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

  // DATATABLE COMPONENT
  return (
    <DataTable className="lightfont h-full min-h-full w-full" size='small' scrollable scrollHeight="100%"
      value={filteredTransactions} dataKey="id" sortField='date' sortOrder={1} removableSort sortMode="multiple"
      paginator rows={paginateRows}
      header={filterable && renderHeader}
      editMode='cell'
      onRowExpand={(e) => { toggleRow(e) }} expandedRows={expandedRow} rowExpansionTemplate={renderRowMetadata}
      globalFilterFields={['description', 'category', 'tags', 'notes', 'amount']} filters={filters}
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