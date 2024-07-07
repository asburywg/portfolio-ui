"use client";
import React, { useState, useEffect, useContext } from 'react';
import { Paginator } from 'primereact/paginator';
import { TransactionContext } from '../../context/TransactionContext';

function formatDateString(dateString) {
    if (dateString !== undefined) {
        const [year, month] = dateString.split('-');
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = monthNames[parseInt(month, 10) - 1];
        return `${monthName} ${year}`;
    } else {
        return '';
    }
};


const DatePagination = () => {

    const { transactions, setSelectedMonth } = useContext(TransactionContext);

    // date selector
    const [dateOptions, setDateOptions] = useState([]);
    const [dateIdx, setDateIdx] = useState(0);

    useEffect(() => {
        const months = [...new Set(transactions.map(tns => tns.month))];
        setDateOptions(months);
    }, [transactions]);

    const paginatorTemplate = {
        layout: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        CurrentPageReport: (options) => {
            return (
                <h3 style={{ width: '150px', textAlign: 'center' }}>
                    {formatDateString(dateOptions[dateIdx])}
                </h3>
            );
        }
    };

    useEffect(() => {
        // set initial date on load
        setSelectedMonth(dateOptions[dateIdx]);
    }, [dateOptions]);

    const onDateChange = (e) => {
        setDateIdx(e.page);
        setSelectedMonth(dateOptions[e.page]);
    };

    return (
        <Paginator first={dateIdx} rows={1} totalRecords={dateOptions.length} onPageChange={onDateChange} template={paginatorTemplate} />
    );
}

export {
    DatePagination,
};