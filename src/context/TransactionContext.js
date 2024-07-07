import React, { createContext, useEffect, useState } from 'react';
import TransactionService from '../services/TransactionsService';
// setError(err.message);
// const [error, setError] = useState(null);


const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {

  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rollups, setRollups] = useState([]);

  // date filter
  const [selectedMonth, setSelectedMonth] = useState(null);


  // GETTERS
  const fetchTransactions = async () => {
    try {
      const data = await TransactionService.getTransactions();
      setTransactions(data);
      // TODO fetch from API
      const accounts = [...new Set(data.map(tns => tns.account))];
      setAccounts(accounts);
    } catch (err) {

      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await TransactionService.getCategories();
      setCategories(data);
      const rollups = [...new Set(data.map(cat => cat.name))];
      setRollups(rollups);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTags = async () => {
    try {
      const data = await TransactionService.getTags();
      setTags(data);
    } catch (err) {
      console.log(err);
    }
  };

  // CREATE

  const createTag = async (tag) => {
    try {
      await TransactionService.createTag(tag);
      fetchTags();
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE

  const updateTag = async (tag, name) => {
    try {
      await TransactionService.updateTag(tag, name);
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

  const updateCategory = async (id, category) => {
    try {
      await TransactionService.updateCategory(id, category);
    } catch (err) {
      console.log(err);
    }
  };


  // DELETE

  const deleteTag = async (tag) => {
    try {
      await TransactionService.deleteTag(tag);
      fetchTags();
    } catch (err) {
      console.log(err);
    }
  };



  // ON LOAD


  useEffect(() => {
    fetchTransactions();
    fetchTags();
    fetchCategories();
  }, []);


  return (
    <TransactionContext.Provider value={{
      transactions,
      accounts,
      tags,
      categories,
      rollups,
      selectedMonth,
      setSelectedMonth,
      updateCategory,
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
