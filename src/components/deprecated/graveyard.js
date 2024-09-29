

// header
<p className="font-bold text-center mb-3">Linked</p>


// line separator
{/* <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"/> */}
{/* <hr class="w-48 h-1 mx-auto bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-700"/> */}



// float label
import { FloatLabel } from "primereact/floatlabel";
<FloatLabel>
    <Dropdown id="account_type" value={accountType} onChange={(e) => { setAccountType(e.value); setInstitution(''); }} options={Object.keys(linkOptions)} className="w-full md:w-14rem" />
    <label htmlFor="account_type">Account Type</label>
</FloatLabel>



    {/* <AccountLinkPopup visible={isAccountsLinking} directory={directoryLink} accountType={directoryLinkAccountType} linkOptions={accountLinkOptions} onHide={onHideAccountDialog} /> */}



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


const headerElement = (title, name) => (
    <div className='flex flex-col -mb-5'>
        <span className="font-bold white-space-nowrap">{title}</span>
        <span className="font-light text-lg white-space-nowrap">{name}</span>
    </div>
);

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
                    <Checkbox inputId="active" onChange={() => setActive(!active)} checked={active} />
                    <label htmlFor="active" className="ml-2">Active</label>
                </div>

            </div>
            <div className="flex justify-center mt-7">
                <Button className='w-1/5' size="small" severity="primary" label="Link" onClick={onHide} />
            </div>
        </Dialog>
    );
};


const accountExpansionTable = (data) => {
    const accounts = accountMap[data.id];
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-7 gap-x-5 gap-y-10 content-start my-1">
                <p className='font-thin text-sm'>Account Name</p>
                <p className='font-thin text-sm'>Institution</p>
                <p className='font-thin text-sm'>Account Type</p>
                <p className='font-thin text-sm'>Account Subtype</p>
                <p className='font-thin text-sm'>Tax Classification</p>
                <p className='font-thin text-sm'>Delegation</p>
                <p className='font-thin text-sm'>Active</p>
            </div>

            {accounts.map((account, idx) => (
                <div id={idx}>
                    <div className="mx-auto grid grid-cols-7 gap-x-5 gap-y-10 content-start my-1">
                        <InputText id="1" value={account['account_name']} className="p-2 text-sm" />
                        <InputText id="2" value={account['institution']} disabled className="p-2 text-sm" />
                        <InputText id="3" value={account['account_type']} disabled className="p-2 text-sm" />
                        <Dropdown id="4" value={account['account_subtype']} options={accLinkOptions['account_subtype'][account['account_type']]} className="text-sm" />
                        <Dropdown id="5" value={account['tax_classification']} options={['test']} className="text-sm" />
                        <Dropdown id="6" value={account['delegation']} options={['test']} className="text-sm" />
                        <Checkbox inputId="active" checked={account['active']} />
                    </div>
                </div>
            ))}
        </div>
    );
};



// try {
        //     const response = await fetch("/api/save-accounts", {
        //         method: "POST",
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(accountList)
        //     });

        //     if (response.ok) {
        //         console.log("Accounts saved successfully");
        //     } else {
        //         console.error("Failed to save accounts");
        //     }
        // } catch (error) {
        //     console.error("Error while saving accounts:", error);
        // }