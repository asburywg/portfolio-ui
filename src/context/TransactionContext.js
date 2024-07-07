import React, { createContext, useEffect, useState } from 'react';
import TransactionService from '../services/TransactionsService';

const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {

  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [tags, setTags] = useState([]);

  // filtered
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const fetchTags = async () => {
    try {
      const data = await TransactionService.getTags();
      setTags(data);
    } catch (err) {
      console.log(err);
    }
  };

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
    fetchTags();
  }, []);

  // TODO fetch from API
  useEffect(() => {
    setFilteredTransactions(transactions);
    const accounts = [...new Set(transactions.map(tns => tns.account))];
    setAccounts(accounts);
  }, [transactions]);

  const createTag = async (tag) => {
    try {
      await TransactionService.createTag(tag);
      fetchTags();
    } catch (err) {
      console.log(err);
    }
  };


  const updateTag = async (tag, name) => {
    try {
      await TransactionService.updateTag(tag, name);
      fetchTags();
    } catch (err) {
      console.log(err);
    }
  };


  const deleteTag = async (tag) => {
    try {
      await TransactionService.deleteTag(tag);
      fetchTags();
    } catch (err) {
      console.log(err);
    }
  };

  const updateMetadata = async (transaction) => {
    try {
      await TransactionService.updateMetadata(transaction);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <TransactionContext.Provider value={{
      transactions,
      accounts,
      tags,
      filteredTransactions,
      setFilteredTransactions,
      createTag,
      updateTag,
      deleteTag,
      updateMetadata
    }}>
      {children}
    </TransactionContext.Provider>
  );

};

export { TransactionProvider, TransactionContext };
