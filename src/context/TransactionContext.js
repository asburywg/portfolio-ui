import React, { createContext, useEffect, useState } from 'react';
import TransactionService from '../services/TransactionsService';

const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {

  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);

  // filtered
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await TransactionService.getTransactions();
        setTransactions(data);
      } catch (err) {
        // setError(err.message);
        // const [error, setError] = useState(null);
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

  return (
    <TransactionContext.Provider value={{
      transactions,
      accounts,
      filteredTransactions,
      setFilteredTransactions,
    }}>
      {children}
    </TransactionContext.Provider>
  );

};

export { TransactionProvider, TransactionContext };
