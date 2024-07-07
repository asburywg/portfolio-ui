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
import { FilterMatchMode } from 'primereact/api';

// const _ = require("lodash"); // impove performance? 


const TransactionsTable = ({ paginateRows = 40, filterable }) => {
  const { transactions, accounts, categories, rollups, tags, updateCategory, selectedMonth } = useContext(TransactionContext);

  // table state
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [expandedRow, setExpandedRow] = useState([]);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    filterTransactions({selectedTags: selectedTags, selectedAccounts: selectedAccounts, selectedCategories: selectedCategories, selectedRollup: selectedRollup});
  }, [selectedMonth]);

  // filters
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRollup, setSelectedRollup] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const groupCategories = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name || option.optionGroup.name}</div>
      </div>
    );
  };

  // FILTERABLE

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // TODO refactor into individual filters, returning first true
  const filterTransactions = ({ selectedTags = [], selectedAccounts = [], selectedCategories = [], selectedRollup = null }) => {
    const filtered = transactions.filter(transaction => {
      const tagFilter = selectedTags.length === 0 || transaction.tags.some(r => selectedTags.includes(r));
      const accountFilter = selectedAccounts.length === 0 || selectedAccounts.some(acc => transaction.account === acc);
      const categoryFilter = selectedCategories.length === 0 || selectedCategories.some(cat => transaction.category === cat.name);
      const monthFilter = selectedMonth === null || transaction.month === selectedMonth;
      const rollupFilter = selectedRollup === null || transaction.rollup === selectedRollup;
      return accountFilter && tagFilter && categoryFilter && rollupFilter && monthFilter;
    });
    setFilteredTransactions(filtered);
  };

  const handleAccountChange = (e) => {
    setSelectedAccounts(e.value);
    filterTransactions({ selectedAccounts: e.value });
  };

  const handleTagChange = (e) => {
    setSelectedTags(e.value);
    filterTransactions({ selectedTags: e.value });
  };

  const handleRollupChange = (e) => {
    setSelectedRollup(e.value || null);
    filterTransactions({ selectedRollup: e.value });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategories(e.value);
    filterTransactions({ selectedCategories: e.value });
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedAccounts([]);
    setSelectedCategories([]);
    setSelectedRollup(null);
    setGlobalFilterValue('');
    let _filters = { ...filters };
    _filters['global'].value = null;
    setFilters(_filters);
    filterTransactions({});
  };

  const renderHeader = () => {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignContent: 'center' }} className='mx-9 my-1'>
            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" className='h-9' />
            {/* <Dropdown value={selectedMonth} options={months} onChange={handleMonthChange} placeholder="Select Month" showClear /> */}
            <MultiSelect value={selectedAccounts} options={accounts.map(tag => ({ label: tag, value: tag }))} onChange={handleAccountChange} maxSelectedLabels={1} placeholder="Select Accounts" resetFilterOnHide={true} filter className='h-9 items-center' />
            <MultiSelect value={selectedTags} options={tags.map(tag => ({ label: tag, value: tag }))} onChange={handleTagChange} display="chip" placeholder="Select Tags" resetFilterOnHide={true} showClear={true} filter className='h-9 items-center' />
            <Dropdown value={selectedRollup} options={rollups} onChange={handleRollupChange} placeholder="Select Rollup" showClear className='h-9 items-center' />
            <MultiSelect disabled={selectedRollup !== null} maxSelectedLabels={1} value={selectedCategories} options={categories} optionLabel="name" optionGroupLabel="name" onChange={handleCategoryChange} optionGroupChildren="subcategories" optionGroupTemplate={groupCategories} placeholder="Select Categories" resetFilterOnHide={true} filter className='h-9 items-center' />
            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilters} className='h-9' />
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
    <DataTable className="lightfont h-full min-h-full w-full" scrollable scrollHeight="100%"
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