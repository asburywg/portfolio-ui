
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { formatDateMonth, formatDateMonthDay } from '../Utils.js'
import { Tooltip } from 'primereact/tooltip';
import { ReportService } from '../services/ReportService.js'



export default function FileSummary() {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);

    const refreshSummary = () => {
        ReportService.serveFileSummary().then((response) => {
            setData(response['data']);
        })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        refreshSummary();
    }, []);


    const statementBodyTemplate = (rowData) => {
        const formattedDate = formatDateMonth(rowData.latest_statement_end);
        return (
            <>
                <span id={`statement-end-${rowData.account_key}`}>{formattedDate}</span>
                <Tooltip className={`absolute left-full rounded-md px-1 ml-3`} target={`#statement-end-${rowData.account_key}`} content={`${rowData.latest_statement_start}\n${rowData.latest_statement_end}`} />
            </>
        );
    };

    const headerTemplate = (data) => {
        return (
            <div className="text-center bg-gradient-to-tr from-gray-200 to-indigo-100 font-bold -m-2" >
                {data.account_type}
            </div>
        );
    };

    return (

        <>
            <div className='flex justify-center mt-10'>
                <DataTable value={data} showGridlines scrollable scrollHeight="100%" size='small' selectionMode="single" selection={selected} onSelectionChange={(e) => setSelected(e.value)}
                    className='w-2/5 lightfont text-base' rowGroupHeaderTemplate={headerTemplate} rowGroupMode="subheader" groupRowsBy="account_type">
                    <Column field="account_name" header="Account" align='center'></Column>
                    <Column field="latest_statement_end" header="Statement" align='center' body={statementBodyTemplate}></Column>
                    <Column field="source" header="Source" align='center'></Column>
                    <Column field="source_date" header="Source Date" alignHeader='center' align='right' body={(x) => formatDateMonthDay(x.source_date)}></Column>
                </DataTable>
            </div>
        </>

    )
}