import React, { useState, useEffect } from 'react';
import { APIService } from '../services/APIService.js'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { Folder, X } from "lucide-react";
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from "primereact/checkbox";
import { FloatLabel } from "primereact/floatlabel";
import { formatDateMonthDay } from '../Utils.js'
import { Tag } from 'primereact/tag';
import { DirectoryLinkDialog } from '../components/subcomponents/DirectoryLinkDialog.js';




// const AccountLinkPopup = ({ visible, directory, accountType, linkOptions, onHide }) => {
//     const [accountName, setAccountName] = useState('');
//     const [accountSubtype, setAccountSubtype] = useState('');
//     const [delegation, setDelegation] = useState('');
//     // const [taxClassification, setTaxClassification] = useState('');
//     const [active, setActive] = useState(true);

//     useEffect(() => {
//         setAccountName(directory.name);
//         setDelegation(linkOptions['default_delegation']);
//     }, [directory.name, linkOptions]);


// const headerElement = (title, name) => (
//     <div className='flex flex-col -mb-5'>
//         <span className="font-bold white-space-nowrap">{title}</span>
//         <span className="font-light text-lg white-space-nowrap">{name}</span>
//     </div>
// );

//     return (
//         <Dialog visible={visible} onHide={onHide} modal header={() => headerElement("Link Accounts", directory.name)} className='w-2/3 h-72' draggable={false}>

//             <div className="px-2 mx-auto grid grid-cols-5 gap-x-5 gap-y-10 content-start mt-10">
//                 <FloatLabel>
//                     <InputText id="accountName" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="w-full md:w-14rem" />
//                     <label htmlFor="accountName">Account Name</label>
//                 </FloatLabel>
//                 <FloatLabel>
//                     <InputText id="delegation" value={delegation} onChange={(e) => setDelegation(e.target.value)} className="w-full md:w-14rem" />
//                     <label htmlFor="delegation">Delegation</label>
//                 </FloatLabel>
//                 <FloatLabel>
//                     <Dropdown id="accountSubtype" value={accountSubtype} onChange={(e) => setAccountSubtype(e.value)} options={accountType === '' ? [] : linkOptions['account_subtype'][accountType]} className="w-full md:w-14rem" />
//                     <label htmlFor="accountSubtype">Account Subtype</label>
//                 </FloatLabel>
//                 {/* <FloatLabel>
//                     <Dropdown id="tax" disabled={!accountSubtype || !linkOptions['tax_classification'].hasOwnProperty(accountSubtype)} value={taxClassification} onChange={(e) => setTaxClassification(e.value)} options={linkOptions['tax_classification'][accountSubtype]} className="w-full md:w-14rem" />
//                     <label htmlFor="tax">Tax Classification</label>
//                 </FloatLabel> */}
//                 <div className="flex align-items-center">
//                     <Checkbox inputId="active" onChange={() => setActive(!active)} checked={active} />
//                     <label htmlFor="active" className="ml-2">Active</label>
//                 </div>

//             </div>
//             <div className="flex justify-center mt-7">
//                 <Button className='w-1/5' size="small" severity="primary" label="Link" onClick={onHide} />
//             </div>
//         </Dialog>
//     );
// };


export default function AccountsPage() {

    // server data
    const [linkedDirs, setLinkedDirs] = useState([]);
    const [unlinkedDirs, setUnlinkedDirs] = useState([]);
    const [dirLinkOptions, setDirLinkOptions] = useState({});

    // directory link
    const [isDirectoryLinking, setIsDirectoryLinking] = useState(false);
    const [directoryLinking, setDirectoryLinking] = useState({});


    // const [accountLinkOptions, setAccountLinkOptions] = useState({});
    // const [isAccountsLinking, setIsAccountsLinking] = useState(false);
    // const [directoryLinkAccountType, setDirectoryLinkAccountType] = useState('');


    const getDirectories = () => {
        APIService.getDirectories().then((response) => {
            setLinkedDirs(response['data']['linked_directories']);
            setUnlinkedDirs(response['data']['unlinked_directories']);
            setDirLinkOptions(response['data']['link_options']);
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

        // setDirectoryLinkAccountType(accountType)
        // setIsAccountsLinking(true);
    };

    // const onHideAccountDialog = () => {
    //     setIsAccountsLinking(false);
    //     getDirectories();
    // };

    /* RENDER DIRECTORY TABLES */

    const text_size = 'text-base'  // text-sm or text-base
    const group_text_size = 'text-base'
    const font_weight = 'font-light'  // font-light, font-normal, font-medium, font-semibold

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
                <div className="flex align-items-center gap-5">
                    {rowData.sources.length > 0 && rowData.sources.map((source, _) => (
                        <Tag value={source['source']} severity={source['color']} />
                    ))}
                </div>
            );
        };

        const renderDate = (x) => {
            return !x.latest_date ? 'N/A' : formatDateMonthDay(x.latest_date)
        };

        // linked directory table variations
        if (mode == 'sortable') {
            return (
                // sortable
                <DataTable className={`${font_weight} w-full mb-5`} value={linkedDirs} dataKey="id" scrollable scrollHeight="flex" size='small' removableSort sortField="latest_date" sortOrder={1} emptyMessage='No directories linked'>
                    <Column field="name" header="Directory" sortable body={folderTemplate}></Column>
                    <Column field="sources" header="" align='center' body={pillRowTemplate}></Column>
                    <Column field="latest_date" header="Latest Date" sortable alignHeader='right' align='right' className={`${text_size} w-[30%] pr-5`} body={renderDate}></Column>
                </DataTable>
            );
        } else if (mode == 'grouped') {
            return (
                // grouped by account type, no sort
                <DataTable className={`${font_weight} w-full`} value={linkedDirs} dataKey="id" size='small' scrollable scrollHeight="flex" rowGroupMode="subheader" groupRowsBy="account_type" rowGroupHeaderTemplate={(x) => renderHeader(x.account_type)} emptyMessage='No directories linked'>
                    <Column field="name" headerStyle={{ display: 'none' }} className={`${text_size} w-[40%]`} body={folderTemplate}></Column>
                    <Column field="sources" headerStyle={{ display: 'none' }} className='w-[30%]' align='center' body={pillRowTemplate}></Column>
                    <Column field="latest_date" headerStyle={{ display: 'none' }} className={`${text_size} w-[30%] pr-5`} alignHeader='right' align='right' body={renderDate}></Column>
                </DataTable>
            );
        } else {
            return (<DataTable />);
        }
    };

    return (
        <div className="h-screen w-full overflow-x-hidden overflow-y-hidden">

            <DirectoryLinkDialog visible={isDirectoryLinking} directory={directoryLinking} linkOptions={dirLinkOptions} onHide={onHideDirDialog} />
            {/* <AccountLinkPopup visible={isAccountsLinking} directory={directoryLink} accountType={directoryLinkAccountType} linkOptions={accountLinkOptions} onHide={onHideAccountDialog} /> */}

            <div className="mx-auto w-[45%] flex h-full flex-col">
                
                {/* linked directories table, mode = ['grouped', 'sortable'] */}
                <div className="mt-16 h-fit max-h-[65%]">
                    {/* {linkedDirectoriesTable('grouped')} */}
                    {linkedDirectoriesTable('sortable')}
                </div>

                {/* unlinked directories, link option */}
                <div className="flex-1 max-h-full h-fit overflow-y-hidden mb-16">
                    <DataTable className={`${font_weight} w-full h-full`} value={unlinkedDirs} dataKey="id" scrollable scrollHeight="flex" size='small' rowGroupMode="subheader" groupRowsBy="account_type" rowGroupHeaderTemplate={(x) => renderHeader(x.account_type)} emptyMessage='No directories found'>
                        <Column field="name" body={folderTemplate} className={text_size} headerStyle={{ display: 'none' }}></Column>
                        <Column body={(x) => <Button size="small" className='w-30 h-4' label='Link' severity="secondary" onClick={() => linkDirectory(x)} />} headerStyle={{ display: 'none' }} className='pr-5' align='right'></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}