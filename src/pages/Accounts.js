import React, { useState, useEffect } from 'react';
import { APIService } from '../services/APIService.js'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { Folder } from "lucide-react";
import { formatDateMonthDay } from '../Utils.js'
import { Tag } from 'primereact/tag';
import { DirectoryLinkDialog } from '../components/subcomponents/DirectoryLinkDialog.js';
import { AccountLine } from '../components/subcomponents/AccountExpansion.js';


export default function AccountsPage() {

    // server data
    const [linkedDirs, setLinkedDirs] = useState([]);
    const [unlinkedDirs, setUnlinkedDirs] = useState([]);
    const [dirLinkOptions, setDirLinkOptions] = useState({});

    const [accountMap, setAccountMap] = useState({});
    const [accLinkOptions, setAccLinkOptions] = useState({});

    // directory link
    const [isDirectoryLinking, setIsDirectoryLinking] = useState(false);
    const [directoryLinking, setDirectoryLinking] = useState({});

    // expand account 
    const [expandedRows, setExpandedRows] = useState({});
    const [expandConstaint, setExpandConstaint] = useState(null);

    const text_size = 'text-base'  // text-sm or text-base
    const group_text_size = 'text-base'
    const font_weight = 'font-light'  // font-light, font-normal, font-medium, font-semibold

    const getDirectories = () => {
        APIService.getDirectories().then((response) => {
            setLinkedDirs(response['data']['linked_directories']);
            setUnlinkedDirs(response['data']['unlinked_directories']);
            setDirLinkOptions(response['data']['directory_link_options']);
            setAccountMap(response['data']['account_map'])
            setAccLinkOptions(response['data']['account_link_options']);
        }).catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        getDirectories();

        // APIService.getLinkOptions().then((response) => {
        //     setDirLinkOptions(response['data']['directory_link_options']);
        //     setAccountLinkOptions(response['data']['account_link_options']);
        // }).catch((e) => {
        //     console.log(e);
        // });
    }, []);

    /* DIRECTORY LINK */

    const linkDirectory = (data) => {
        setIsDirectoryLinking(true);
        setDirectoryLinking(data);
    };

    const onHideDirDialog = () => {  // accountType
        setIsDirectoryLinking(false);
        getDirectories(); // only refresh on link: call in dialog
    };

    /* ACCOUNT LINK */

    const onAccountExpand = (e) => {
        // enforce one expanded row at a time
        let _expandedRows = {};
        if(!expandConstaint) {
            setExpandConstaint(e.data);
            setExpandedRows(e.data);
        }else {
            Object.keys(e.data).filter(key => !(key in expandConstaint)).forEach((p) => (_expandedRows[`${p}`] = true));
            setExpandConstaint(_expandedRows);
            setExpandedRows(_expandedRows);
        }
    };

    const onAccountCollapse = (_) => {
        setExpandedRows(null);
    };


    const accountExpansion = (data) => {
        let accounts = accountMap[data.id]

        const newAccount = {
            "directory_id": data.id,
            "account_name": accounts[0]['account_name'],
            "institution": accounts[0]['institution'],
            "account_type": "",
            "account_subtype": "",
            "tax_classification": "",
            "delegation": "",
            "active": true
        }

        const addNewAccount = () => {
            accounts.push(newAccount)
        };
        
        return (
            <div key={data.id} className="flex flex-col bg-slate-100 -m-2">
                <div className="flex mx-5 mt-6 gap-3">
                    <p className='font-semibold text-sm w-[15%]'>Account Name</p>
                    <p className='font-semibold text-sm w-[15%]'>Institution</p>
                    <p className='font-semibold text-sm w-[15%]'>Account Type</p>
                    <p className='font-semibold text-sm w-[20%]'>Account Subtype</p>
                    <p className='font-semibold text-sm w-[15%]'>Tax Classification</p>
                    <p className='font-semibold text-sm w-[15%]'>Delegation</p>
                    <p className='font-semibold text-sm w-[5%] flex items-center justify-center'>Active</p>
                </div>

                {accounts.map((account, idx) => (
                    <React.Fragment key={idx}>
                        <AccountLine account={account} linkOptions={accLinkOptions} />
                    </React.Fragment>
                ))}

                <div className="flex mb-4 mx-5 justify-between items-center">
                    <Button icon="pi pi-plus" raised rounded className='w-10 h-10 bg-slate-400 border-0' onClick={addNewAccount} />
                    <Button className='w-[10%] h-8 bg-white text-black border-black' size="small" label="Save" />
                </div>
                
            </div>
        );
    };

    /* RENDER DIRECTORY TABLES */

    const renderHeader = (val, pad=true) => {
        return <p className={`font-bold ${group_text_size} ${pad ? 'mt-3 -mb-1' : ''}`}>{val}</p>
    };

    const folderTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <Folder size={20} />
                <span>{rowData.name}</span>
            </div>
        );
    };

    const linkedDirectoriesTable = (mode = 'sortable') => {

        const pillRowTemplate = (rowData) => {
            return (
                <div className="flex align-items-center gap-2">
                    {rowData.sources.length > 0 && rowData.sources.map((source, idx) => (
                        <Tag key={idx} value={source['source']} severity={source['color']} />
                    ))}
                </div>
            );
        };

        const renderDate = (x) => {
            return !x.latest_date ? 'N/A' : formatDateMonthDay(x.latest_date)
        };

        // linked directory table variations
        if (mode === 'sortable') {
            return (
                // sortable
                <DataTable className={`${font_weight} w-[45%] mb-5 mx-auto`} value={linkedDirs} dataKey="id" scrollable scrollHeight="flex" size='small' removableSort sortField="latest_date" sortOrder={1} emptyMessage='No directories linked'>
                    <Column field="name" header="Directory" sortable body={folderTemplate}></Column>
                    <Column field="sources" header="" align='center' body={pillRowTemplate}></Column>
                    <Column field="latest_date" header="Latest Date" sortable alignHeader='right' align='right' className={`${text_size} w-[30%] pr-5`} body={renderDate}></Column>
                </DataTable>
            );
        } else if (mode === 'grouped') {
            return (
                // grouped by account type, no sort
                <DataTable className={`${font_weight} w-[45%] mx-auto`} value={linkedDirs} dataKey="id" size='small' scrollable scrollHeight="flex" rowGroupMode="subheader" groupRowsBy="account_type" rowGroupHeaderTemplate={(x) => renderHeader(x.account_type)} emptyMessage='No directories linked'>
                    <Column field="name" headerStyle={{ display: 'none' }} className={`${text_size} w-[40%]`} body={folderTemplate}></Column>
                    <Column field="sources" headerStyle={{ display: 'none' }} className='w-[30%]' align='center' body={pillRowTemplate}></Column>
                    <Column field="latest_date" headerStyle={{ display: 'none' }} className={`${text_size} w-[30%] pr-5`} alignHeader='right' align='right' body={renderDate}></Column>
                </DataTable>
            );
        } else if (mode === 'expandable') {
            return (
                // expandable with accounts
                <DataTable className={`${font_weight} w-[75%] mx-auto mb-20`} value={linkedDirs} dataKey="id" scrollable scrollHeight="flex" size='small' emptyMessage='No directories linked'
                           expandedRows={expandedRows} onRowCollapse={onAccountCollapse} onRowToggle={onAccountExpand} rowExpansionTemplate={accountExpansion} >
                    <Column expander className='w-12 h-12' headerStyle={{ height: '0px' }} />
                    <Column field="name" header="Directory" body={folderTemplate}></Column>
                    <Column field="sources" header="" align='center' body={pillRowTemplate}></Column>
                    <Column field="latest_date" header="Latest Date" headerStyle={{paddingRight: '1.25rem'}} alignHeader='left' align='left' className={`${text_size} w-[30%] pr-5`} body={renderDate}></Column>
                </DataTable>
            );
        } else {
            return (<DataTable />);
        }
    };

    return (
        <div className="h-screen w-full overflow-x-hidden overflow-y-hidden">

            <DirectoryLinkDialog visible={isDirectoryLinking} directory={directoryLinking} linkOptions={dirLinkOptions} onHide={onHideDirDialog} />

            <div className="flex w-full h-full flex-col">
                
                <div className="mt-16 h-fit max-h-[65%]">
                    {/* {linkedDirectoriesTable('grouped')} */}
                    {/* {linkedDirectoriesTable('sortable')} */}
                    {linkedDirectoriesTable('expandable')}
                </div>

                <div className="w-[45%] mx-auto flex-1 max-h-full h-fit overflow-y-hidden mb-16">
                    <DataTable className={`${font_weight} w-full h-full`} value={unlinkedDirs} dataKey="id" scrollable scrollHeight="flex" size='small' rowGroupMode="subheader" groupRowsBy="account_type" rowGroupHeaderTemplate={(x) => renderHeader(x.account_type)} emptyMessage='No directories found'>
                        <Column field="name" body={folderTemplate} className={text_size} headerStyle={{ display: 'none' }}></Column>
                        <Column body={(x) => <Button size="small" className='w-30 h-4' label='Link' severity="secondary" onClick={() => linkDirectory(x)} />} headerStyle={{ display: 'none' }} className='pr-5' align='right'></Column>
                    </DataTable>
                </div>

            </div>
        </div>
    )
}