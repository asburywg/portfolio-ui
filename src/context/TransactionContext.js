import React, { createContext, useContext, useEffect, useState } from 'react';
import TransactionService from '../services/TransactionsService';

const TransactionContext = createContext();
export const useTransactionContext = () => useContext(TransactionContext);


export const TransactionProvider = ({ children }) => {

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await TransactionService.getTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      }
    };
    console.log('i fire once');
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, error }}>
      {children}
    </TransactionContext.Provider>
  );

};
