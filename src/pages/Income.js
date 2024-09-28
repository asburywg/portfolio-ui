import React, { useMemo, useState } from 'react';
import {MaterialReactTable, useMaterialReactTable, MRT_ExpandAllButton as ExpandButton} from 'material-react-table';
import { formatCurrency } from '../Utils.js';
import { Box, Stack } from '@mui/material';

export default function IncomePage() {
    const res = {
        'columns': [{ 'accessorKey': 'group', 'header': 'Group' }, { 'accessorKey': 'YTD', 'header': 'YTD' }, { 'accessorKey': 'FY', 'header': 'FY' }, { 'accessorKey': '2023', 'header': '2023' }, { 'accessorKey': '2022', 'header': '2022' }, { 'accessorKey': '2021', 'header': '2021' }, { 'accessorKey': '2020', 'header': '2020' }, { 'accessorKey': '2019', 'header': '2019' }], 
        'rows': [{"group": "Earnings", "2019": 80807.34999999998, "2020": 97822.89000000004, "2021": 120347.67000000003, "2022": 154296.29000000007, "2023": 146142.16000000003, "YTD": 109025.11000000003, "FY": 147398.06000000003, "subRows": [{"group": "Bonus", "2019": 948.11, "2020": 542.14, "2021": 3654.43, "2022": 14000.0, "2023": 10142.14, "YTD": 8134.0}, {"group": "RSU Net", "2022": 16118.09}, {"group": "Salary", "2019": 79859.23999999998, "2020": 97280.75000000004, "2021": 116693.24000000003, "2022": 124178.20000000004, "2023": 136000.02000000008, "FY": 139264.06000000006, "YTD": 100891.11000000004}]}, {"group": "Pre-Tax Deductions", "2020": 933.26, "2021": 1539.080000000001, "2022": 1611.6800000000003, "2023": 1685.3199999999997, "YTD": 6325.82, "FY": 15624.13, "subRows": [{"group": "401k Pre-Tax Employee Contribution", "FY": 13869.13, "YTD": 5043.32}, {"group": "Insurance", "2020": 933.2600000000001, "2021": 1539.0800000000004, "2022": 1611.6799999999996, "2023": 1685.319999999999, "FY": 3509.999999999999, "YTD": 1282.4999999999995}]}, {"group": "Taxable Income", "highlight": true, "2019": 80819.31, "2020": 96910.61000000003, "2021": 118855.41999999998, "2022": 152736.38999999996, "2023": 144520.28000000003, "YTD": 102749.82999999996, "FY": 131843.08999999997}, {"group": "Taxes", "2019": 17142.180000000015, "2020": 21922.780000000017, "2021": 28585.419999999987, "2022": 38243.76000000001, "2023": 35688.969999999994, "YTD": 25120.280000000006, "FY": 32225.000000000007}, {"group": "After-Tax Deductions", "2019": 5016.699999999997, "2020": 2325.6499999999996, "2021": 16447.19999999999, "2022": 24478.09000000001, "2023": 12240.100000000013, "YTD": 6713.780000000003, "FY": 9129.340000000004, "subRows": [{"group": "401k Roth Employee Contribution", "2019": 4791.509999999999, "2020": 1954.6000000000001, "2021": 15778.929999999995, "2022": 12775.740000000002, "2023": 8160.100000000004, "FY": 8708.920000000002, "YTD": 6406.550000000002}, {"group": "Long-Term Disability", "2019": 225.19000000000005, "2020": 271.0499999999999, "2021": 368.27000000000015, "2022": 388.2000000000001, "2023": 397.27999999999975, "FY": 420.4200000000002, "YTD": 307.2300000000002}, {"group": "Other", "2020": 100.0, "2021": 300.0, "2022": 11314.15, "2023": 3682.72}]}, {"group": "Net Income", "highlight": true, "2019": 58648.46999999997, "2020": 72641.20000000001, "2021": 73775.96999999999, "2022": 89962.76, "2023": 96527.77000000003, "YTD": 70865.23000000001, "FY": 90419.59000000001}]





      }

    const [data, setData] = useState(res['rows']);


    const columns = useMemo(() => {
        return res['columns'].map(col => ({
          ...col,
          header: col.header,
          Cell: props => <div>{formatCurrency(props.renderedCellValue) === '$0.00' ? "" : formatCurrency(props.renderedCellValue)}</div>,
          grow: false,
          size: 175,
          maxSize: 175,
          minSize: 175
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
        enableBottomToolbar:false,  // footer, add custom date pagination here
        enableTopToolbar:false,
        // enableHiding: false,
        layoutMode: 'semantic',  // 'grid' and grow specified will set size, 'semantic' grow has no affect
        initialState: {
          density: 'compact',
          columnVisibility: { group: false }
        },
    
        // EXPANDER
        displayColumnDefOptions: {
          'mrt-row-expand': {
            Header: () => (
              // <MRT_ExpandAllButton table={table} />
              <Stack direction="row" alignItems="center">
                <ExpandButton table={table} />
                {/* <Box>Group</Box> */}
              </Stack>
            ),
            GroupedCell: ({ row }) => {
              return row.getValue('group');
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
            backgroundColor: row.original.highlight ? '#d9d9d9' : '',
          },
        }),
    
        // HEADER FORMATTING
        muiTableHeadCellProps: ({ column }) => ({
          align: column.id.match(/\d{4}-\d{2}/g) ? 'right' : 'left',
        }),
    
      });


    return (
        <div className="h-5/6 w-7/12 mx-auto mt-5">
            <MaterialReactTable table={table} />
        </div>
    );
}