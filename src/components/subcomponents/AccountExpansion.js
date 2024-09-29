import React, { useState, useEffect } from 'react';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from "primereact/checkbox";

export const AccountLine = ({ account, idx, linkOptions }) => {

    const [accountName, setAccountName] = useState('');
    const [accountSubtype, setAccountSubtype] = useState('');
    const [delegation, setDelegation] = useState('');
    const [taxClassification, setTaxClassification] = useState('');
    const [active, setActive] = useState(true);

    const [accountSubtypeOptions, setAccountSubtypeOptions] = useState([]);
    const [taxClassificationOptions, setTaxClassificationOptions] = useState([]);
    const [delegationOptions, setDelegationOptions] = useState([]);


    useEffect(() => {
        console.log(linkOptions);
        setAccountName(account['account_name']);
        setAccountSubtype(account['account_subtype']);
        setDelegation(account['delegation']);
        setTaxClassification(account['tax_classification']);
        setActive(account['active']);

        setAccountSubtypeOptions(account['account_type'] === '' || !linkOptions ? [] : linkOptions['account_subtype'][account['account_type']]);
        setDelegationOptions(!linkOptions ? [] : linkOptions['delegations'])
    }, [account, linkOptions]);

    useEffect(() => {
        setTaxClassificationOptions(accountSubtype !== '' && linkOptions !== undefined && linkOptions['tax_classification'].hasOwnProperty(accountSubtype) ? linkOptions['tax_classification'][accountSubtype] : []);
        if (accountSubtype == "Business" || accountSubtype == "Individual") {
            setDelegation(accountSubtype);
        }
    }, [accountSubtype]);

    return (
        <div id={idx}>
            <div className="mx-4 flex mt-1 gap-3 mb-4">
                <InputText id="1" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="p-inputtext-sm h-10 w-[15%]" />
                <InputText id="2" value={account['institution']} disabled className="p-inputtext-sm h-10 w-[15%]" />
                <InputText id="3" value={account['account_type']} disabled className="p-inputtext-sm h-10 w-[15%]" />
                <Dropdown id="4" value={accountSubtype} options={accountSubtypeOptions} disabled={accountSubtypeOptions.length === 0} onChange={(e) => setAccountSubtype(e.value)} className="p-inputtext-sm h-10 w-[20%]" placeholder={accountSubtypeOptions.length === 0 ? 'N/A' : 'Select Subtype'} />
                <Dropdown id="5" value={taxClassification} options={taxClassificationOptions} disabled={taxClassificationOptions.length === 0} onChange={(e) => setTaxClassification(e.value)} className="p-inputtext-sm h-10 w-[15%]" placeholder={taxClassificationOptions.length === 0 ? 'N/A' : 'Select Type'} />
                <Dropdown id="6" value={delegation} options={delegationOptions} onChange={(e) => setDelegation(e.value)} className="p-inputtext-sm h-10 w-[15%]" />
                <Checkbox inputId="active" checked={active} onChange={() => setActive(!active)} className="w-[5%] h-10 flex items-center justify-center" />
            </div>
        </div>
    );
};