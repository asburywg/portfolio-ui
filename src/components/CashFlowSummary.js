"use client";
import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TransactionContext } from '../context/TransactionContext';
import {formatPercent, formatCurrency} from '../Utils';


const CashFlowSummary = () => {
    const { selectedMonth, cashFlowSummary } = useContext(TransactionContext);

    const [expandedRows, setExpandedRows] = useState([]);
    const [subExpandedRows, setSubExpandedRows] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        setSelected(null);
        // set defaulted as expanded groups
        if (cashFlowSummary[selectedMonth] !== undefined) {
            setExpandedRows(cashFlowSummary[selectedMonth].filter(({ name }) => ['Income', 'Living', 'Leisure'].includes(name)));
        }
    }, [cashFlowSummary, selectedMonth]);

    const allowExpansion = (rowData) => {
        return ("breakdown" in rowData) && rowData.breakdown.length > 0 && rowData.name !== 'Expenses'
    };

    const rowExpansionTemplate = (data) => {
        return data.breakdown.length > 0 && (
            <DataTable showHeaders={false} style={{ width: "100%" }} value={data.breakdown} size='small'
                selectionMode="single" selection={selected} onSelectionChange={(e) => setSelected(e.value)}
                expandedRows={subExpandedRows} rowExpansionTemplate={rowExpansionTemplate} onRowToggle={(e) => setSubExpandedRows(e.data)} scrollable scrollHeight="500px">
                <Column expander={allowExpansion} style={{ width: '11%', border: "0px" }} />
                <Column field="name" style={{ width: '33%', border: "0px" }}></Column>
                <Column field="total" body={(row) => formatCurrency(row.total)} style={{ width: '30%', border: "0px" }} align='right'></Column>
                <Column field="perc" body={(row) => formatPercent(row.perc)} style={{ marginLeft: '10rem', border: "0px" }} align='right'></Column>
            </DataTable>
        );
    };

    const formatRow = (rowData) => {
        return rowData.name.replace(/ /g, "_");
    };

    return (
        <DataTable rowClassName={formatRow} value={cashFlowSummary[selectedMonth]} expandedRows={expandedRows} rowExpansionTemplate={rowExpansionTemplate} onRowToggle={(e) => setExpandedRows(e.data)}
            scrollable scrollHeight="85vh" selectionMode="single" selection={selected} onSelectionChange={(e) => setSelected(e.value)}>
            <Column expander={allowExpansion} style={{ width: '3rem', height: '3rem' }} headerStyle={{ backgroundColor: '#FFFFFF', height: '0px' }} />
            <Column field="name" headerStyle={{ backgroundColor: '#FFFFFF' }}></Column>
            <Column field="total" body={(row) => formatCurrency(row.total)} align='right' headerStyle={{ backgroundColor: '#FFFFFF' }}></Column>
            <Column field="perc" body={(row) => formatPercent(row.perc)} align='right' headerStyle={{ backgroundColor: '#FFFFFF' }} style={{ fontWeight: 'bold' }}></Column>
        </DataTable>
    )
}

export {
    CashFlowSummary,
};