
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import {formatDateMonth} from '../Utils.js'
import { Tooltip } from 'primereact/tooltip';

const data = [{"account_key": "fidelity", "account_type": "brokerage", "latest_statement_start": "05/01/2024", "latest_statement_end": "05/31/2024", "latest_paystub": "", "latest_transaction_date": "", "latest_activity_date": "11/30/2022"}, {"account_key": "fidelity_401k", "account_type": "brokerage", "latest_statement_start": "05/01/2024", "latest_statement_end": "05/31/2024", "latest_paystub": "", "latest_transaction_date": "", "latest_activity_date": "06/03/2024"}, {"account_key": "fidelity_ira", "account_type": "brokerage", "latest_statement_start": "05/01/2024", "latest_statement_end": "05/31/2024", "latest_paystub": "", "latest_transaction_date": "", "latest_activity_date": "05/31/2024"}, {"account_key": "lte_brokerage", "account_type": "brokerage", "latest_statement_start": "", "latest_statement_end": "", "latest_paystub": "", "latest_transaction_date": "", "latest_activity_date": "05/31/2024"}, {"account_key": "robinhood", "account_type": "brokerage", "latest_statement_start": "05/01/2024", "latest_statement_end": "05/31/2024", "latest_paystub": "", "latest_transaction_date": "", "latest_activity_date": "06/07/2024"}, {"account_key": "titan", "account_type": "brokerage", "latest_statement_start": "02/01/2024", "latest_statement_end": "03/31/2024", "latest_paystub": "", "latest_transaction_date": "", "latest_activity_date": ""}, {"account_key": "apple_card", "account_type": "credit", "latest_statement_start": "05/01/2024", "latest_statement_end": "05/31/2024", "latest_paystub": "", "latest_transaction_date": "05/31/2024", "latest_activity_date": ""}, {"account_key": "chase_southwest", "account_type": "credit", "latest_statement_start": "", "latest_statement_end": "", "latest_paystub": "", "latest_transaction_date": "05/24/2024", "latest_activity_date": ""}, {"account_key": "pnc_cash_rewards", "account_type": "credit", "latest_statement_start": "", "latest_statement_end": "", "latest_paystub": "", "latest_transaction_date": "05/13/2024", "latest_activity_date": ""}, {"account_key": "target_redcard", "account_type": "credit", "latest_statement_start": "", "latest_statement_end": "", "latest_paystub": "", "latest_transaction_date": "05/09/2024", "latest_activity_date": ""}, {"account_key": "ally", "account_type": "debit", "latest_statement_start": "04/26/2024", "latest_statement_end": "05/25/2024", "latest_paystub": "", "latest_transaction_date": "05/25/2024", "latest_activity_date": ""}, {"account_key": "american_express", "account_type": "debit", "latest_statement_start": "05/01/2024", "latest_statement_end": "05/31/2024", "latest_paystub": "", "latest_transaction_date": "", "latest_activity_date": ""}, {"account_key": "wealthfront", "account_type": "debit", "latest_statement_start": "05/01/2024", "latest_statement_end": "05/31/2024", "latest_paystub": "", "latest_transaction_date": "05/17/2024", "latest_activity_date": ""}, {"account_key": "cwc_mortgage", "account_type": "debt", "latest_statement_start": "", "latest_statement_end": "06/01/2024", "latest_paystub": "", "latest_transaction_date": "", "latest_activity_date": ""}, {"account_key": "nielsen", "account_type": "salary", "latest_statement_start": "", "latest_statement_end": "", "latest_paystub": "06/28/2024", "latest_transaction_date": "", "latest_activity_date": ""}]

export default function FileSummary() {
    const [selected, setSelected] = useState(null);

    const statementBodyTemplate = (rowData) => {
        const formattedDate = formatDateMonth(rowData.latest_statement_end);
        return (
          <>
            <span id={`statement-end-${rowData.account_key}`}>{formattedDate}</span>
            <Tooltip className={`absolute left-full rounded-md px-1 ml-3`} target={`#statement-end-${rowData.account_key}`} content={`${rowData.latest_statement_start} - ${rowData.latest_statement_end}`} />
          </>
        );
    };

    return (

        <>
            <div className='flex justify-center mt-10'>
                <DataTable value={data} showGridlines scrollable scrollHeight="800px" size='small' selectionMode="single" selection={selected} onSelectionChange={(e) => setSelected(e.value)}
                    className='w-7/12'>
                    <Column field="account_key" header="Account Key" align='center' sortable></Column>
                    <Column field="account_type" header="Account Type" align='center' sortable></Column>
                    <Column field="latest_statement_end" header="Statement" align='center' body={statementBodyTemplate} sortable></Column>
                    <Column field="latest_paystub" header="Paystub" align='center' sortable></Column>
                    <Column field="latest_transaction_date" header="Transactions" align='center' sortable></Column>
                    <Column field="latest_activity_date" header="Activity" align='center' sortable></Column>
                </DataTable>
            </div>
        </>
        
    )
}