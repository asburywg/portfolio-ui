import { useState, useEffect, useContext, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Dropdown } from 'primereact/dropdown';
import { ManageTagsDialog } from './ManageTagsDialog.js';
// import { TagsService } from '../service/TagsService';
// import { TransactionsService } from '../service/TransactionsService';
import { TransactionContext } from '../../context/TransactionContext';


export const TransactionsMetadata = ({ transaction, collapse }) => {
    const { tags, updateMetadata } = useContext(TransactionContext);

    const [showPopup, setShowPopup] = useState(false);
    const [transactionTags, setTransactionTags] = useState([]);
    const [remainingTagOptions, setRemainingTagOptions] = useState([]);
    const [fullTagList, setFullTagList] = useState([]);

    const form = useForm({
        defaultValues: useMemo(() => {
            return transaction;
        }, [transaction])
    });

    useEffect(() => {
        setRemainingTagOptions(fullTagList.filter(tag => !transactionTags.some(transactionTag => transactionTag === tag)));
    }, [transactionTags, fullTagList, form]);


    useEffect(() => {
        setFullTagList(tags);
        setTransactionTags(transaction.tags);
        form.reset(transaction);
    }, [transaction, tags, form]);

    const onSubmit = (data) => {
        data['tags'] = transactionTags;
        updateMetadata(data);
        collapse([]);
        transaction.tags = data.tags;
        transaction.notes = data.notes;
    };

    const onCancel = (data) => {
        data['tags'] = transaction.tags
        data['notes'] = transaction.notes
        setTransactionTags(transaction.tags);
        form.reset();
        collapse([]);
    };

    const onTagSelect = (tag) => {
        setTransactionTags([...transactionTags, tag]);
        const newTagList = remainingTagOptions.filter((t) => t !== tag);
        setRemainingTagOptions(newTagList);
    };

    const onTagRemove = (tag) => {
        setRemainingTagOptions([...remainingTagOptions, tag]);
        const newTags = transactionTags.filter((t) => t !== tag);
        setTransactionTags(newTags);
    };

    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)} onReset={form.handleSubmit(onCancel)}>

                {/* user inputs */}
                <div style={{ display: "flex", height: '7vw', width: '70%', margin: '0 auto' }}>

                    {/* notes */}
                    <div style={{ width: '50%' }}>
                        <h5 style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>Notes</h5>
                        <Controller name="notes" control={form.control} render={({ field, fieldState }) => (
                            <InputTextarea id={field.name} {...field} style={{ width: '100%', height: '75%' }} placeholder="" />  //rows={9} cols={37}
                        )}
                        />
                    </div>

                    {/* tags */}
                    <div style={{ marginLeft: '3rem', width: '20%' }}>
                        <h5 style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>Tags</h5>
                        <Controller name="tags" control={form.control} render={({ field }) =>
                            <Dropdown value={field.value} onChange={(e) => onTagSelect(e.value)} options={remainingTagOptions} placeholder="Tags" />
                        } />
                        <h5 style={{ marginBottom: "0.5rem", marginTop: "1.5rem", cursor: "pointer", color: 'blue' }} onClick={() => setShowPopup(!showPopup)}>Manage Tags</h5>
                    </div>

                    {/* selected tags */}
                    <div style={{ width: '30%', height: '80%', alignContent: 'center' }}>
                        {transactionTags.map((tag) => (
                            <Chip key={tag} label={tag} removable removeIcon="pi pi-times" className="p-mr-2" onRemove={() => onTagRemove(tag)} style={{ margin: "3px" }} />
                        ))}
                    </div>

                </div>

                {/* buttons */}
                <div style={{ display: "flex", justifyContent: 'right', marginBottom: "10px", marginTop: "0px" }}>
                    <div style={{ marginRight: "1rem" }}>
                        <Button size="small" type='reset' severity="secondary" label="Cancel" />
                    </div>
                    <div>
                        <Button size="small" type="submit" severity="success" label="Submit" />
                    </div>
                </div>

            </form>

            <ManageTagsDialog visible={showPopup} onHide={() => setShowPopup(false)} />
        </div>
    );
};
