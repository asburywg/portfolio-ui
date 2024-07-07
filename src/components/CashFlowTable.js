import React, { useMemo, useState } from 'react';
import {MaterialReactTable, useMaterialReactTable, MRT_ExpandAllButton as ExpandButton} from 'material-react-table';
import { formatCurrency } from '../Utils.js';
import { Box, Stack } from '@mui/material';

// TOOD utils
const formatDateHeader = (dateString) => {
  const splitter = dateString.split('-');
  const date = new Date(splitter[0], splitter[1] - 1, 1);
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
};
const res = {
  'columns': [{ 'accessorKey': 'category', 'header': 'Category' }, { 'accessorKey': '2024-03', 'header': '2024-03' }, { 'accessorKey': '2024-02', 'header': '2024-02' }, { 'accessorKey': '2024-01', 'header': '2024-01' }], 'rows': [{ 'category': 'Income', '2024-03': 11118.779999999999, '2024-02': 7327.7300000000005, '2024-01': 9100.910000000002, 'subRows': [{ 'category': 'Interest Income', '2024-03': 131.23, '2024-02': 126.53, '2024-01': 111.85 }, { 'category': 'Misc Income', '2024-01': 205.0 }, { 'category': 'Paycheck', '2024-03': 10987.55, '2024-02': 7201.200000000001, '2024-01': 8784.060000000001 }] }, { 'category': 'Expenses', '2024-03': -4638.75, '2024-02': -5012.679999999999, '2024-01': -5157.5, 'subRows': [{ 'category': 'Living', '2024-03': -3926.29, '2024-02': -4305.23, '2024-01': -4037.14, 'subRows': [{ 'category': 'Altis Rent', '2024-03': -3094.25, '2024-02': -3081.66, '2024-01': -3076.35 }, { 'category': 'Altis Utilities & Cost', '2024-03': -64.16, '2024-02': -58.74, '2024-01': -71.33 }, { 'category': 'Bills & Subscriptions', '2024-03': -307.47999999999996, '2024-02': -327.87000000000006, '2024-01': -303.9 }, { 'category': 'Gas & Fuel', '2024-02': -41.97 }, { 'category': 'Groceries', '2024-03': -460.40000000000003, '2024-02': -333.75999999999993, '2024-01': -563.56 }, { 'category': 'Misc Expenses', '2024-02': -461.23, '2024-01': -22.0 }] }, { 'category': 'Leisure', '2024-03': -712.46, '2024-02': -707.4499999999999, '2024-01': -1120.36, 'subRows': [{ 'category': 'Clothing', '2024-03': -34.72, '2024-02': 122.27000000000001, '2024-01': -517.02 }, { 'category': 'Convenience', '2024-03': -139.65, '2024-02': -150.33999999999997, '2024-01': -153.74 }, { 'category': 'Food & Dining', '2024-03': -254.65999999999997, '2024-02': -242.42999999999995, '2024-01': -192.76 }, { 'category': 'Shopping', '2024-03': -283.43, '2024-02': -379.8, '2024-01': -230.92000000000002 }, { 'category': 'Travel', '2024-02': -57.15, '2024-01': -25.92 }] }, { 'category': 'Uncategorized', '2024-03': 0, '2024-02': 0, '2024-01': 0, 'subRows': [] }] }, { 'category': 'Net Profit', '2024-03': 6480.029999999999, '2024-02': 2315.050000000001, '2024-01': 3943.4100000000017, 'subRows': [] }]
}


const CashFlowTable = () => {

  // const [visibleColumns, setVisibleColumns] = useState(['category', '2024-03', '2024-04', '2024-05', 'TTM']);

  const [data, setData] = useState(res['rows']);

  // const columns = useMemo(() => headers, []);
  // .filter(col => visibleColumns.includes(col.accessorKey))
  const columns = useMemo(() => {
    return res['columns'].map(col => ({
      ...col,
      header: !(['TTM', 'Category', ''].includes(col.header)) ? formatDateHeader(col.header) : col.header,
      Cell: props => <div>{formatCurrency(props.renderedCellValue)}</div>,
      grow: false,
      size: 175,
      maxSize: 175,
      minSize: 175
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
    enableBottomToolbar:false,  // footer, add custom date pagination here
    enableTopToolbar:false,
    // enableHiding: false,
    layoutMode: 'semantic',  // 'grid' and grow specified will set size, 'semantic' grow has no affect
    initialState: {
      density: 'compact',
      columnVisibility: { category: false }
    },

    // EXPANDER
    displayColumnDefOptions: {
      'mrt-row-expand': {
        Header: () => (
          // <MRT_ExpandAllButton table={table} />
          <Stack direction="row" alignItems="center">
            <ExpandButton table={table} />
            <Box>Category</Box>
          </Stack>
        ),
        GroupedCell: ({ row }) => {
          return row.getValue('category');
        },
        grow: false,
        size: 250,
        maxSize: 250,
        minSize: 250
      },
    },

    // ROW FORMATTING
    muiTableBodyCellProps: ({ column, row }) => ({
      align: column.id.match(/\d{4}-\d{2}/g) ? 'right' : 'left',
      sx: {
        backgroundColor: (['Net Profit', 'Income', 'Expenses'].includes(row.original.category)) ? '#F5F5F5' : '',
      },
    }),

    // HEADER FORMATTING
    muiTableHeadCellProps: ({ column }) => ({
      align: column.id.match(/\d{4}-\d{2}/g) ? 'right' : 'left',
    }),

  });

  return <MaterialReactTable table={table} />;
}

export {
  CashFlowTable,
};