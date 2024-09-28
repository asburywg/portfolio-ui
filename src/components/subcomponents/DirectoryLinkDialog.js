"use client";
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { APIService } from '../../services/APIService.js'

export const DirectoryLinkDialog = ({ visible, directory, linkOptions, onHide }) => {
    const [accountType, setAccountType] = useState('');
    const [institution, setInstitution] = useState('');

    const onHideDialog = () => {
        setAccountType('');
        setInstitution('');
        onHide();  // accountType
    };

    const linkDirectory = () => {
        APIService.linkDirectory(directory.id, accountType, institution).catch((e) => {
            console.log(e);  // TODO: handle errors
        });
        onHideDialog();
    };

    const headerElement = (title, name) => (
        <>
        <span className="font-extrabold white-space-nowrap">{title} - {name}</span>
        <hr class="h-px mt-3 border-0 bg-gray-300 w-[95%]"/>
        </>
    );

    return (
        <Dialog visible={visible} onHide={onHideDialog} modal header={() => headerElement("Link Directory", directory.name)} className='w-[30%]' draggable={false}>
            <div className="px-10 mx-auto grid grid-cols-2 gap-x-10 gap-y-10 content-start">
                <div>
                    <p className='font-thin text-sm mb-1'>Account Type</p>
                    <Dropdown id="account_type" value={accountType} onChange={(e) => { setAccountType(e.value); setInstitution(''); }} options={Object.keys(linkOptions)} className="w-full md:w-14rem" />
                </div>
                <div>
                    <p className='font-thin text-sm mb-1'>Institution</p>
                    <Dropdown disabled={accountType === ''} id="institution" value={institution} onChange={(e) => setInstitution(e.value)} options={linkOptions[accountType]} className="w-full md:w-14rem" />
                </div>
            </div>
            <div className="flex justify-center mt-7">
                <Button className='w-1/3' disabled={accountType === '' || institution === ''} size="small" severity="primary" label="Link" onClick={linkDirectory} />
            </div>
        </Dialog>
    );
};