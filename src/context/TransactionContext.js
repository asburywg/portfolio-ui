import React, { createContext, useEffect, useState } from 'react';
import TransactionService from '../services/TransactionsService';

const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {

  const [transactions, setTransactions] = useState([]);
  // const [error, setError] = useState(null);

  // filters
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await TransactionService.getTransactions();
        setTransactions(data);
      } catch (err) {
        // setError(err.message);
        console.log(err);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    setFilteredTransactions(transactions);
    const accounts = [...new Set(transactions.map(tns => tns.account))];
    setAccounts(accounts);
  }, [transactions]);

  const filterTransactions = (accounts) => {
    const filtered = transactions.filter(transaction => {
      const accountFilter = accounts.length === 0 || accounts.some(acc => transaction.account === acc);
      return accountFilter;
    });
    setFilteredTransactions(filtered);
  };

  // const selectionChange = (e) => {
    // setSelectedAccounts(e.value);
    // filterTransactions(accounts=e.value);
  // };


  return (
    <TransactionContext.Provider value={{
      transactions,
      accounts,
      filteredTransactions,
      filterTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  );

};

export { TransactionProvider, TransactionContext };
