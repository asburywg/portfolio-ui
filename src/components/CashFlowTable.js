import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ExpandAllButton
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
    // "2024-03-perc": 10,
    "2024-04": -6863.8,
    "2024-05": -7591.659999999999,
    "subRows": [
      {
        "category": "Living",
        "2024-03": -3158.41,
        "2024-04": -3151.2599999999998,
        "2024-05": -3160.3599999999997,
        "subRows": [
          {
            "category": "Altis",
            "2024-03": -3094.25,
            "2024-04": -3088.14,
            "2024-05": -3089.95,
            "subRows": [
              {
                "category": "Altis Rent",
                "2024-03": -3094.25,
                "2024-04": -3088.14,
                "2024-05": -3089.95,
              }
            ]
          }
        ]
      },
      {
        "category": "Leisure",
        "2024-03": -3158.41,
        "2024-04": -3151.2599999999998,
        "2024-05": -3160.3599999999997,
        "subRows": [
          {
            "category": "Altis Rent",
            "2024-03": -3094.25,
            "2024-04": -3088.14,
            "2024-05": -3089.95,
          }
        ]
      }
    ]
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
    size: 50,
  },
  {
    "accessorKey": "2024-03",
    "header": "2024-03",
    Cell: props => <div> {formatCurrency(props.renderedCellValue)} </div>,
    size: 50,
    muiTableBodyCellProps: {
      align: 'right'
    },
    muiTableHeadCellProps: {
      align: 'right',
    },
  },
  // {
  //   "accessorKey": "2024-03-perc",
  //   "header": "",
  //   // Cell: props => <div> {formatCurrency(props.renderedCellValue)} </div>,
  //   size: 5,
  //   muiTableBodyCellProps: {
  //     align: 'right'
  //   },
  //   muiTableHeadCellProps: {
  //     align: 'right',
  //   },
  // },
  {
    "accessorKey": "2024-04",
    "header": "2024-04",
    Cell: props => <div> {formatCurrency(props.renderedCellValue)} </div>,
    size: 50,
    muiTableBodyCellProps: {
      align: 'right',
    },
    muiTableHeadCellProps: {
      align: 'right',
    },
  },
  {
    "accessorKey": "2024-05",
    "header": "2024-05",
    Cell: props => <div> {formatCurrency(props.renderedCellValue)} </div>,
    size: 50,
    muiTableBodyCellProps: {
      align: 'right',
    },
    muiTableHeadCellProps: {
      align: 'right',
    },
  },
  {
    "accessorKey": "TTM",
    "header": "TTM",
    Cell: props => <div> {formatCurrency(props.renderedCellValue)} </div>,
    size: 50,
    muiTableBodyCellProps: {
      align: 'right',
    },
    muiTableHeadCellProps: {
      align: 'right',
    },
  }
]


const CashFlowTable = () => {

  const [visibleColumns, setVisibleColumns] = useState(['category', '2024-03', '2024-04', '2024-05', 'TTM']);

  // const columns = useMemo(() => headers, []);
  // .filter(col => visibleColumns.includes(col.accessorKey))
  const columns = useMemo(() => {
    return headers.map(col => ({
      ...col,
      header: !(['TTM', 'Category', ''].includes(col.header)) ? formatDateHeader(col.header) : col.header,
    }));
  }, []);

  // https://www.material-react-table.com/docs/guides/column-grouping#customize-expand-column
  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: true,
    enableExpanding: true,
    enableSorting: false,
    enableFilters: false,
    enableColumnActions: false,
    enablePagination: false,
    layoutMode: 'fixed',
    initialState: {
      density: 'compact'
    },
    displayColumnDefOptions: {
      'mrt-row-expand': {
        Header: () => (
          <MRT_ExpandAllButton table={table} />
        ),
        muiTableBodyCellProps: ({ row }) => ({
          sx: () => ({
            maxWidth: '4rem',
            width: '4rem',
            backgroundColor: (['Net Income', 'Income', 'Expenses'].includes(row.original.category)) ? '#F5F5F5' : ''
          }),
        }),
        size: 40,
        minSize: 40,
      },
    },
    muiTableBodyCellProps: ({ row }) => ({
      sx: {
        backgroundColor: (['Net Income', 'Income', 'Expenses'].includes(row.original.category)) ? '#F5F5F5' : ''
      },
    }),

  });

  return <MaterialReactTable table={table} />;
}

export {
  CashFlowTable,
};