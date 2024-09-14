import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from "primereact/checkbox";
import { FloatLabel } from "primereact/floatlabel";

function isEmpty(str) {
    return (!str || str.length === 0 || str === 'None' );
}

const AccountLinkPopup = ({ visible, account, onHide }) => {
    const [institution, setInstitution] = useState(isEmpty(account.institution) ? null : account.institution);
    const [accountType, setAccountType] = useState(isEmpty(account.account_type) ? null : account.account_type);
    const [accountSubtype, setAccountSubtype] = useState(isEmpty(account.account_subtype) ? null : account.account_subtype);
    const [delegation, setDelegation] = useState(isEmpty(account.delegation) ? null : account.delegation);
    const [taxClassification, setTaxClassification] = useState(isEmpty(account.tax_classification) ? null : account.tax_classification);

    const [selectedCity, setSelectedCity] = useState(null);
    const [tagNameInput, setTagNameInput] = useState("");
    const [checked, setChecked] = useState(true);

    const options = {"account_type": ["cash", "liability", "brokerage", "revenue"], "account_subtype": {"cash": ["checking", "savings"], "liability": ["credit_card", "mortgage"], "brokerage": ["individual", "401k", "ira"], "revenue": ["paystubs"]}, "tax_classification": {"401k": ["roth", "traditional"], "ira": ["roth", "traditional", "inherited"]}, "delegation": ["Individual"]};
    const account_options = {"Checking": ["American Express", "Chase", "Wealthfront"], "Savings": ["Ally"], "Credit Card": ["Apple Card", "Chase Southwest", "PNC Cash Rewards", "Target RedCard"], "Paystubs": ["Nielsen"], "Mortgage": ["Chase"], "Brokerage": ["Fidelity", "Robinhood", "Titan"]}
    return (
        <Dialog visible={visible} onHide={onHide} modal header={account.account_name} className='w-1/3 h-2/5' draggable={false}>

            <div class="px-5 mx-auto grid grid-cols-2 gap-x-10 gap-y-10 content-start my-5">

                
                {!accountType && <FloatLabel>
                    <Dropdown id="account_type" value={accountType} onChange={(e) => setAccountType(e.value)} options={Object.keys(account_options)} className="w-full md:w-14rem" />
                    <label htmlFor="account_type">Account Type</label>
                </FloatLabel>}
                {accountType && <FloatLabel>
                    <Dropdown id="institution" value={institution} onChange={(e) => setInstitution(e.value)} options={account_options[accountType]} className="w-full md:w-14rem" />
                    <label htmlFor="institution">Institution</label>
                </FloatLabel>}


                {/* <FloatLabel>
                    <InputText id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} className="w-full md:w-14rem" />
                    <label htmlFor="institution">Institution</label>
                </FloatLabel>
                <FloatLabel>
                    <Dropdown id="account_type" value={accountType} onChange={(e) => setAccountType(e.value)} options={options['account_type']} className="w-full md:w-14rem" />
                    <label htmlFor="account_type">Account Type</label>
                </FloatLabel>
                <FloatLabel>
                    <Dropdown id="delegation" value={delegation} onChange={(e) => setDelegation(e.target.value)} options={options['delegation']} editable className="w-full md:w-14rem" />
                    <label htmlFor="delegation">Delegation</label>
                </FloatLabel>
                <FloatLabel>
                    <Dropdown id="account_subtype" disabled={!accountType} value={accountSubtype} onChange={(e) => setAccountSubtype(e.value)} options={options['account_subtype'][accountType]} className="w-full md:w-14rem" />
                    <label htmlFor="account_subtype">Account Subtype</label>
                </FloatLabel>
                <div className="flex align-items-center">
                    <Checkbox inputId="active" onChange={()=>setChecked(!checked)} checked={checked} />
                    <label htmlFor="active" className="ml-2">Active</label>
                </div>
                <FloatLabel>
                    <Dropdown id="test" value={taxClassification} disabled={!accountSubtype || !options['tax_classification'].hasOwnProperty(accountSubtype)} onChange={(e) => setTaxClassification(e.value)} options={options['tax_classification'][accountSubtype]} className="w-full md:w-14rem" />
                    <label htmlFor="test">Tax Classification</label>
                </FloatLabel> */}
            </div>
            
        </Dialog>
    );
  };


export function AccountStatus() {
    const [data, setData] = useState({"colors": {"Unlinked": "secondary"}, "accounts": {"Cash": [], "Liability": [], "Brokerage": [], "Revenue": [], "Unlinked": [{"id": "1", "account_key": "ally", "account_name": "Ally", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Ally", "active": "True"}, {"id": "20", "account_key": "american_express_cwc", "account_name": "American Express CWC", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "American Express CWC", "active": "True"}, {"id": "15", "account_key": "american_express_gfc", "account_name": "American Express GFC", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "American Express GFC", "active": "True"}, {"id": "5", "account_key": "apple_card", "account_name": "Apple Card", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Apple Card", "active": "True"}, {"id": "10", "account_key": "best_buy", "account_name": "Best Buy", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Best Buy", "active": "True"}, {"id": "17", "account_key": "charles_schwab", "account_name": "Charles Schwab", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Charles Schwab", "active": "True"}, {"id": "21", "account_key": "chase_checking_lte", "account_name": "Chase Checking LTE", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Chase Checking LTE", "active": "True"}, {"id": "4", "account_key": "chase_mortgage_cwc", "account_name": "Chase Mortgage CWC", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Chase Mortgage CWC", "active": "True"}, {"id": "9", "account_key": "chase_southwest", "account_name": "Chase Southwest", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Chase Southwest", "active": "True"}, {"id": "6", "account_key": "coinbase", "account_name": "Coinbase", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Coinbase", "active": "True"}, {"id": "18", "account_key": "fidelity", "account_name": "Fidelity", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Fidelity", "active": "True"}, {"id": "12", "account_key": "fidelity_lte", "account_name": "Fidelity LTE", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Fidelity LTE", "active": "True"}, {"id": "13", "account_key": "fidelity_netbenefits", "account_name": "Fidelity NetBenefits", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Fidelity NetBenefits", "active": "True"}, {"id": "19", "account_key": "nielsen_paystubs", "account_name": "Nielsen Paystubs", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Nielsen Paystubs", "active": "True"}, {"id": "14", "account_key": "pnc_cash_rewards", "account_name": "PNC Cash Rewards", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "PNC Cash Rewards", "active": "True"}, {"id": "8", "account_key": "quicken_mortgage_cwc", "account_name": "Quicken Mortgage CWC", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Quicken Mortgage CWC", "active": "True"}, {"id": "11", "account_key": "robinhood", "account_name": "Robinhood", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Robinhood", "active": "True"}, {"id": "2", "account_key": "td_ameritrade", "account_name": "TD Ameritrade", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "TD Ameritrade", "active": "True"}, {"id": "7", "account_key": "target_redcard", "account_name": "Target RedCard", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Target RedCard", "active": "True"}, {"id": "16", "account_key": "titan", "account_name": "Titan", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Titan", "active": "True"}, {"id": "3", "account_key": "wealthfront", "account_name": "Wealthfront", "linked": "False", "institution": "None", "account_type": "None", "account_subtype": "None", "tax_classification": "None", "delegation": "Individual", "display_name": "Wealthfront", "active": "True"}]}, "link_options": {"account_type": ["cash", "liability", "brokerage", "revenue"], "account_subtype": {"cash": ["checking", "savings"], "liability": ["credit_card", "mortgage"], "brokerage": ["individual", "401k", "ira"], "revenue": ["paystubs"]}, "tax_classification": {"401k": ["roth", "traditional"], "ira": ["roth", "traditional", "inherited"]}, "delegation": ["Individual"]}});
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const handleButtonClick = (account) => {
        setSelectedAccount(account);
        setIsDialogVisible(true);
    };

    const handleDialogHide = () => {
        setIsDialogVisible(false);
        setSelectedAccount(null);
    };

    return (
        <div className="h-full overflow-y-auto">
            <div className="mx-auto w-2/3">
                {data.hasOwnProperty('accounts') && Object.keys(data.accounts).map((key) => (
                    <>
                    <Divider align="center"><span className="p-tag text-lg bg-white text-black">{key}</span></Divider>
                    <div class="mx-auto grid grid-cols-3 gap-x-10 gap-y-6 content-start mb-6">
                        {data.accounts[key].map((account => (
                            <Button icon="pi pi-building-columns" severity={data.colors[key]} raised rounded label={account.display_name} onClick={() => handleButtonClick(account)} />
                        )))}
                    </div>
                    </>
                ))}
            </div>

            {isDialogVisible && <AccountLinkPopup
                visible={isDialogVisible}
                account={selectedAccount}
                onHide={handleDialogHide}
            />}
                
            
                {/* <div className="mx-auto w-2/3 h-full overflow-y-auto"> */}

            {/* <Divider align="center"><span className="p-tag text-lg bg-white text-black">Cash</span></Divider>
            <div class="w-2/3 mx-auto grid grid-cols-2 gap-x-10 gap-y-6 content-start mb-6">
                <Button icon="pi pi-building-columns" severity="info" raised rounded label='Ally'/>
                <Button icon="pi pi-building-columns" severity="contrast" text raised rounded outlined label='Wealthfront'/>
                <Button icon="pi pi-building-columns" severity="secondary" raised rounded label='American Express CWC'/>
                <Button icon="pi pi-building-columns" severity="contrast" raised rounded label='American Express GFC'/>

            </div>

            <Divider align="center"><span className="p-tag ">Liability</span></Divider>
            <div class="w-2/3 mx-auto grid grid-cols-2 gap-x-10 gap-y-6 content-start mb-6">
                <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>PNC Cash Rewards</div>
                <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Chase Southwest</div>
                <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Target RedCard</div>
                <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Apple Card</div>
                <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Chase Mortgage CWC</div>
                <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Rocket Mortgage CWC</div>
            </div>

            <Divider align="center"><span className="p-tag text-lg bg-white text-black">Brokerage</span></Divider>
            <div class="w-2/3 mx-auto grid grid-cols-2 gap-x-10 gap-y-6 content-start mb-6">
                <Button icon="pi pi-building-columns" severity="info" text raised rounded label='Fidelity'/>
                <Button icon="pi pi-building-columns" severity="info" raised rounded label='Fidelity LTE'/>
                <Button icon="pi pi-building-columns" severity="info" raised rounded label='Fidelity NetBenefits'/>
                <Button icon="pi pi-building-columns" severity="info" raised rounded label='Robinhood'/>
                <Button icon="pi pi-building-columns" severity="info" raised rounded label='Titan'/>
                <button type="button" class="text-lg font-sans text-white bg-sky-500 font-bold rounded-full focus:ring-4 focus:outline-1 focus:ring-sky-600 focus:border-1">
                
                Titan
                </button> */}
{/* "px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" */}

                {/* <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Fidelity</div> */}
                {/* <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Fidelity LTE</div> */}
                {/* <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Fidelity NetBenefits</div> */}
                {/* <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Robinhood</div> */}
                {/* <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Titan</div> */}
            {/* </div> */}
            
            {/* <Divider align="center"><span className="p-tag text-lg bg-white text-black">Revenue</span></Divider>
            <div class="w-2/3 mx-auto grid grid-cols-2 gap-x-10 gap-y-6 content-start mb-6">
                <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Nielsen Paystubs</div>
            </div>
            
            <Divider align="center"><span className="p-tag text-lg bg-white text-black">Unlinked</span></Divider>
            <div class="w-2/3 mx-auto grid grid-cols-2 gap-x-10 gap-y-6 content-start mb-6">
                <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Best Buy</div>
                <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Charles Schwab</div>
                <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>Coinbase</div>
                <div className='border-2 border-black h-16 flex items-center justify-center font-bold'>TD Ameritrade</div>
            </div> */}


            {/* <div class="grid grid-cols-1 divide-y h-full">
                <div className='h-1/4'>
                <Divider align="center"><span className="p-tag">Cash</span></Divider>
                </div>
                <div className='h-1/4'>
                    <h6 class="text-lg font-bold">Liability</h6>
                </div>
                <div className='h-1/4'>
                    <h6 class="text-lg font-bold">Revenue</h6>
                </div>
                <div className='h-1/4'>
                    <h6 class="text-lg font-bold">Unlinked</h6>
                </div>
            </div> */}
            
            {/* <h6 class="text-lg font-bold mb-1">Cash</h6>
            <Divider className='-mt-1 w-1/3 border-2 border-black' />            
            <h6 class="text-lg font-bold">Liability</h6>
            <Divider className='-mt-1' />
            <h6 class="text-lg font-bold">Revenue</h6>
            <Divider className='-mt-1' />
            <h6 class="text-lg font-bold">Unlinked</h6>
            <Divider className='-mt-1' /> */}

        </div>
    )
}