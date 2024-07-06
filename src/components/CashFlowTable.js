import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { formatCurrency } from '../Utils.js';

// TOOD utils
const formatDateHeader = (dateString) => {
  const date = new Date(dateString + '-01'); // Add day part to create a valid date
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
};

const data = [
    {
      "category": "Income",
      "2024-03": 11118.779999999999,
      "2024-04": 7590.71,
      "2024-05": 7868.7699999999995,
      "subRows": [
        {
          "category": "Interest Income",
          "2024-03": 131.23,
          "2024-04": 164.51999999999998,
          "2024-05": 179.57
        },
        {
          "category": "Misc Income",
          "2024-05": 488.0
        }
      ]
    },
    {
      "category": "Expenses",
      "2024-03": -4638.75,
      "2024-04": -6863.8,
      "2024-05": -7591.659999999999,
      "subRows": [
        {
          "category": "Altis",
          "2024-03": -3158.41,
          "2024-04": -3151.2599999999998,
          "2024-05": -3160.3599999999997,
          "subRows": [
            {
              "category": "Altis Rent",

              "2024-03": -3094.25,
              "2024-04": -3088.14,
              "2024-05": -3089.95

            }
          ]
        }]
    },
    {
      "category": "Net Income",
      "2024-03": 123.75,
      "2024-04": 863.8,
      "2024-05": 91.659999999999
    }
  ]

const headers = [
  {
    "accessorKey": "category",
    "header": "Category",
    size: 120,
  },
  {
    "accessorKey": "2024-03",
    "header": "2024-03",
    Cell: props => <div> {formatCurrency(props.renderedCellValue)} </div>,
    size: 20,
    muiTableBodyCellProps: {
      align: 'right'
    },
  },
  {
    "accessorKey": "2024-04",
    "header": "2024-04",
    Cell: props => <div> {formatCurrency(props.renderedCellValue)} </div>,
    size: 20,
    muiTableBodyCellProps: {
      align: 'right',
    },
  },
  {
    "accessorKey": "2024-05",
    "header": "2024-05",
    Cell: props => <div> {formatCurrency(props.renderedCellValue)} </div>,
    size: 20,
    muiTableBodyCellProps: {
      align: 'right',
    },
  },
  {
    "accessorKey": "TTM",
    "header": "TTM",
    Cell: props => <div> {formatCurrency(props.renderedCellValue)} </div>,
    size: 20,
    muiTableBodyCellProps: {
      align: 'right',
    },
  }
]


const CashFlowTable = () => {

  // const columns = useMemo(() => headers, []);
  const columns = useMemo(() => {
    return headers.map(col => ({
      ...col,
      header: !(['TTM', 'Category'].includes(col.header)) ? formatDateHeader(col.header) : col.header
    }));
  }, []);

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: true,
    enableExpanding: true,
    enableSorting: false,
    enableFilters: false,
    enableColumnActions: false,
    enablePagination: false,
    initialState: { density: 'compact' },
    muiTableBodyCellProps: ({ row }) => ({
      sx: {
        backgroundColor: ( ['Net Income', 'Income', 'Expenses'].includes(row.original.category)) ? '#F5F5F5': ''
      },
    }),
    
  });

  return <MaterialReactTable table={table} />;
}

export {
  CashFlowTable,
};