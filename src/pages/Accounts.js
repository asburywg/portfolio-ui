import React, { useState, useEffect } from 'react';
import { APIService } from '../services/APIService.js'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { Folder } from "lucide-react";
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from "primereact/checkbox";
import { FloatLabel } from "primereact/floatlabel";


const headerElement = (title, name) => (
    <div className='flex flex-col -mb-5'>
        <span className="font-bold white-space-nowrap">{title}</span>
        <span className="font-light text-lg white-space-nowrap">{name}</span>
    </div>
);

const AccountLinkPopup = ({ visible, directory, accountType, linkOptions, onHide }) => {
    const [accountName, setAccountName] = useState('');
    const [accountSubtype, setAccountSubtype] = useState('');
    const [delegation, setDelegation] = useState('');
    // const [taxClassification, setTaxClassification] = useState('');
    const [active, setActive] = useState(true);

    useEffect(() => {
        setAccountName(directory.name);
        setDelegation(linkOptions['default_delegation']);
    }, [directory.name, linkOptions]);


    return (
        <Dialog visible={visible} onHide={onHide} modal header={() => headerElement("Link Accounts", directory.name)} className='w-2/3 h-72' draggable={false}>

            <div className="px-2 mx-auto grid grid-cols-5 gap-x-5 gap-y-10 content-start mt-10">
                <FloatLabel>
                    <InputText id="accountName" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="w-full md:w-14rem" />
                    <label htmlFor="accountName">Account Name</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText id="delegation" value={delegation} onChange={(e) => setDelegation(e.target.value)} className="w-full md:w-14rem" />
                    <label htmlFor="delegation">Delegation</label>
                </FloatLabel>
                <FloatLabel>
                    <Dropdown id="accountSubtype" value={accountSubtype} onChange={(e) => setAccountSubtype(e.value)} options={accountType === '' ? [] : linkOptions['account_subtype'][accountType]} className="w-full md:w-14rem" />
                    <label htmlFor="accountSubtype">Account Subtype</label>
                </FloatLabel>
                {/* <FloatLabel>
                    <Dropdown id="tax" disabled={!accountSubtype || !linkOptions['tax_classification'].hasOwnProperty(accountSubtype)} value={taxClassification} onChange={(e) => setTaxClassification(e.value)} options={linkOptions['tax_classification'][accountSubtype]} className="w-full md:w-14rem" />
                    <label htmlFor="tax">Tax Classification</label>
                </FloatLabel> */}
                <div className="flex align-items-center">
                    <Checkbox inputId="active" onChange={()=>setActive(!active)} checked={active} />
                    <label htmlFor="active" className="ml-2">Active</label>
                </div>
                
            </div>
            <div className="flex justify-center mt-7">
                <Button className='w-1/5' size="small" severity="primary" label="Link" onClick={onHide} />
            </div>
        </Dialog>
    );
};


const DirectoryLinkPopup = ({ visible, directory, linkOptions, onHide }) => {
    const [accountType, setAccountType] = useState('');
    const [institution, setInstitution] = useState('');

    const onHideDialog = () => {
        setAccountType('');
        setInstitution('');
        onHide(accountType);
    };

    const linkDirectory = () => {
        APIService.linkDirectory(directory.id, accountType, institution).catch((e) => {
            console.log(e);
        });
        onHideDialog();
    };

    return (
        <Dialog visible={visible} onHide={onHideDialog} modal header={() => headerElement("Link Directory", directory.name)} className='w-1/3 h-72' draggable={false}>
            <div className="px-5 mx-auto grid grid-cols-2 gap-x-10 gap-y-10 content-start mt-10">
                <FloatLabel>
                    <Dropdown id="account_type" value={accountType} onChange={(e) => { setAccountType(e.value); setInstitution(''); }} options={Object.keys(linkOptions)} className="w-full md:w-14rem" />
                    <label htmlFor="account_type">Account Type</label>
                </FloatLabel>
                <FloatLabel>
                    <Dropdown disabled={accountType === ''} id="institution" value={institution} onChange={(e) => setInstitution(e.value)} options={linkOptions[accountType]} className="w-full md:w-14rem" />
                    <label htmlFor="institution">Institution</label>
                </FloatLabel>
            </div>
            <div className="flex justify-center mt-7">
                <Button className='w-1/3' disabled={accountType === '' || institution === ''} size="small" severity="primary" label="Link" onClick={linkDirectory} />
            </div>
        </Dialog>
    );
};

export default function AccountsPage() {

    const [directories, setDirectories] = useState([]);
    const [dirLinkOptions, setDirLinkOptions] = useState({});
    const [accountLinkOptions, setAccountLinkOptions] = useState({});
    const [isDirectoryLinking, setIsDirectoryLinking] = useState(false);
    const [isAccountsLinking, setIsAccountsLinking] = useState(false);
    const [directoryLink, setDirectoryLink] = useState({});
    const [directoryLinkAccountType, setDirectoryLinkAccountType] = useState('');


    const getDirectories = () => {
        APIService.getDirectories().then((response) => {
            setDirectories(response['data']);
        }).catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        getDirectories();

        APIService.getLinkOptions().then((response) => {
            setDirLinkOptions(response['data']['directory_link_options']);
            setAccountLinkOptions(response['data']['account_link_options']);
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    const linkDirectory = (data) => {
        setIsDirectoryLinking(true);
        setDirectoryLink(data);
    };

    const folderTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <Folder size={20} />
                <span>{rowData.name}</span>
            </div>
        );
    };

    const headerTemplate = (data) => {
        return <span className="font-bold">{data.linked ? "Linked" : "Unlinked"}</span>
    };

    const linkTemplate = (data) => {
        return !data.linked && <Button size="small" className='w-30 h-4' label='Link' severity="secondary" onClick={() => linkDirectory(data)} />
    };

    const onHideDirDialog = (accountType) => {
        setDirectoryLinkAccountType(accountType)
        setIsDirectoryLinking(false);
        setIsAccountsLinking(true);
        getDirectories();
    };

    const onHideAccountDialog = () => {
        setIsAccountsLinking(false);
        getDirectories();
    };

    return (
        <div className="h-screen w-full overflow-x-hidden overflow-y-hidden">

            <DirectoryLinkPopup visible={isDirectoryLinking} directory={directoryLink} linkOptions={dirLinkOptions} onHide={onHideDirDialog} />
            <AccountLinkPopup visible={isAccountsLinking} directory={directoryLink} accountType={directoryLinkAccountType} linkOptions={accountLinkOptions} onHide={onHideAccountDialog} />

            <div className="mx-auto w-2/3 mt-20 h-4/5">
                <DataTable className="lightfont h-full min-h-full w-full" value={directories} dataKey="id" scrollable scrollHeight="100%"
                    rowGroupMode="subheader" groupRowsBy="linked" rowGroupHeaderTemplate={headerTemplate} size='small'>
                    <Column field="name" body={folderTemplate} headerStyle={{ display: 'none' }}></Column>
                    <Column body={linkTemplate} headerStyle={{ display: 'none' }}></Column>

                </DataTable>
            </div>
        </div>
    )
}