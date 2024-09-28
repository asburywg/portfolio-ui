

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