import React, { useState, useEffect } from 'react';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from "primereact/checkbox";
import { Button } from 'primereact/button';
import api from '../../services/axiosConfig';

function AccountLink({ id, accounts, linkOptions }) {

    const [accountList, setAccountList] = useState([]);

    useEffect(() => {
        setAccountList(accounts);
    }, [accounts]);

    const addNewAccount = () => {
        const newAccount = {"directory_id": id, "account_name": "", "institution": accounts[0]['institution'], "account_type": accounts[0]['account_type'], "account_subtype": "", "tax_classification": "", "delegation": "", "active": true}
        setAccountList([...accountList, newAccount]);
    };

    const handleAccountChange = (index, updatedAccount) => {
        const updatedAccounts = [...accountList];
        updatedAccounts[index] = updatedAccount;
        setAccountList(updatedAccounts);
    };

    const saveChanges = async () => {
        try {
            const response = await api.post('/accounts/link', {"accounts": accountList});
            return response.data;
          } catch (error) {
            console.error('Error', error);
            throw error;
          }
    };

    return (
        <div key={id} className="flex flex-col bg-slate-100 -m-2">
            <div className="flex mx-5 mt-6 gap-3">
                <p className='font-semibold text-sm w-[15%]'>Account Name</p>
                <p className='font-semibold text-sm w-[15%]'>Institution</p>
                <p className='font-semibold text-sm w-[15%]'>Account Type</p>
                <p className='font-semibold text-sm w-[20%]'>Account Subtype</p>
                <p className='font-semibold text-sm w-[15%]'>Tax Classification</p>
                <p className='font-semibold text-sm w-[15%]'>Delegation</p>
                <p className='font-semibold text-sm w-[5%] flex items-center justify-center'>Active</p>
            </div>

            {accountList.map((account, idx) => (
                <React.Fragment key={idx}>
                    <AccountLine account={account} linkOptions={linkOptions} onChange={(updatedAccount) => handleAccountChange(idx, updatedAccount)} />
                </React.Fragment>
            ))}

            <div className="flex mb-4 mx-5 justify-between items-center">
                <Button icon="pi pi-plus" raised rounded className='w-10 h-10 bg-slate-400 border-0' onClick={addNewAccount} />
                <Button className='w-[10%] h-8 bg-white text-black border-black' size="small" label="Save" onClick={saveChanges} />
            </div>

        </div>
    );

}

function AccountLine({ account, linkOptions, onChange }) {

    const [accountName, setAccountName] = useState(account.account_name || '');
    const [accountSubtype, setAccountSubtype] = useState(account.account_subtype || '');
    const [delegation, setDelegation] = useState(account.delegation || '');
    const [taxClassification, setTaxClassification] = useState(account.tax_classification || '');
    const [active, setActive] = useState(account.active || true);

    const [accountSubtypeOptions, setAccountSubtypeOptions] = useState([]);
    const [taxClassificationOptions, setTaxClassificationOptions] = useState([]);
    const [delegationOptions, setDelegationOptions] = useState([]);


    useEffect(() => {
        setAccountSubtypeOptions(account['account_type'] === '' || !linkOptions ? [] : linkOptions['account_subtype'][account['account_type']]);
        setDelegationOptions(!linkOptions ? [] : linkOptions['delegations'])
    }, [account, linkOptions]);


    useEffect(() => {
        setTaxClassificationOptions(accountSubtype !== '' && linkOptions !== undefined && linkOptions['tax_classification'].hasOwnProperty(accountSubtype) ? linkOptions['tax_classification'][accountSubtype] : []);
        if (accountSubtype === "Business" || accountSubtype === "Individual") {
            setDelegation(accountSubtype);
        }
    }, [accountSubtype, linkOptions]);


    useEffect(() => {
        if (account.account_name !== accountName || account.account_subtype !== accountSubtype || account.delegation !== delegation || account.tax_classification !== taxClassification || account.active !== active) {
            onChange({
                ...account,
                account_name: accountName,
                account_subtype: accountSubtype,
                delegation: delegation,
                tax_classification: taxClassification,
                active: active,
            });
        }
    }, [accountName, accountSubtype, delegation, taxClassification, active, account, onChange]);


    return (
        <div className="mx-4 flex mt-1 gap-3 mb-4">
            <InputText id="1" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="p-inputtext-sm h-10 w-[15%]" />
            <InputText id="2" value={account['institution']} disabled className="p-inputtext-sm h-10 w-[15%]" />
            <InputText id="3" value={account['account_type']} disabled className="p-inputtext-sm h-10 w-[15%]" />
            <Dropdown id="4" value={accountSubtype} options={accountSubtypeOptions} disabled={accountSubtypeOptions.length === 0} onChange={(e) => setAccountSubtype(e.value)} className="p-inputtext-sm h-10 w-[20%]" placeholder={accountSubtypeOptions.length === 0 ? 'N/A' : 'Select Subtype'} />
            <Dropdown id="5" value={taxClassification} options={taxClassificationOptions} disabled={taxClassificationOptions.length === 0} onChange={(e) => setTaxClassification(e.value)} className="p-inputtext-sm h-10 w-[15%]" placeholder={taxClassificationOptions.length === 0 ? 'N/A' : 'Select Type'} />
            <Dropdown id="6" value={delegation} options={delegationOptions} onChange={(e) => setDelegation(e.value)} className="p-inputtext-sm h-10 w-[15%]" />
            <Checkbox inputId="active" checked={active} onChange={() => setActive(!active)} className="w-[5%] h-10 flex items-center justify-center" />
        </div>
    );
};

export {
    AccountLine,
    AccountLink,
};