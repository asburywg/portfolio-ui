"use client";
import React, { useState,useEffect, useContext } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import { TransactionContext } from '../../context/TransactionContext';
import 'primeicons/primeicons.css';

export const ManageTagsDialog = ({ visible, onHide }) => {
    const { tags, createTag, updateTag, deleteTag } = useContext(TransactionContext);

    /**
     * Dialog to list and manage tags.
     *    POST new tag
     *    PUT edit existing tag name
     *    DELETE existing tag
     */
    const [editingTag, setEditingTag] = useState(null);
    const [addNewTagBool, setAddNewTagBool] = useState(false);
    const [tagNameInput, setTagNameInput] = useState("");

    useEffect(() => {
        clear();
      }, [tags, visible]);

    const addTag = () => {
        createTag(tagNameInput);
    }

    const editTag = () => {
        updateTag(editingTag, tagNameInput);
    }

    const removeTag = () => {
        deleteTag(editingTag);
    }

    const clear = () => {
        setEditingTag(null);
        setAddNewTagBool(false);
        setTagNameInput("");
    }

    const tagEditing = (tag) => {
        setEditingTag(tag);
        setTagNameInput(tag);
    }

    return (
        <Dialog visible={visible} onHide={onHide} header="Manage Tags" modal style={{ width: '60vw', height: '30vw' }}>

            <div style={{ marginTop: '10px', height: "3rem" }}>
                {!addNewTagBool ? (
                    <Button icon="pi pi-plus" severity="secondary" rounded size="small" onClick={() => setAddNewTagBool(true)} />
                ) : (
                    <>
                        <InputText type="text" value={tagNameInput} onChange={(e) => setTagNameInput(e.target.value)} />
                        <Button icon="pi pi-check" style={{ fontSize: '1rem', marginLeft: '8px' }} outlined severity="success" onClick={addTag} />
                        <Button icon="pi pi-times" style={{ fontSize: '1rem', marginLeft: '6px' }} outlined severity="secondary" onClick={clear} />
                    </>
                )}
            </div>

            {/* <hr style={{ width: '100%', borderTop: '1px solid #ccc', margin: '20px 0' }} /> */}

            <div style={{ marginTop: '30px' }}>
                {tags.map((tag) => (
                    editingTag != tag ? (
                        <Chip key={tag} label={tag} removable removeIcon="pi pi-pencil" className="p-mr-2" style={{ margin: '5px', fontSize: '15px' }} onRemove={() => tagEditing(tag)} />
                    ) : (
                        <>
                            <InputText key={tag} type="text" value={tagNameInput} onChange={(e) => setTagNameInput(e.target.value)} style={{ width: '10rem' }} />
                            <Button key="1" icon="pi pi-check" style={{ fontSize: '1rem', marginLeft: '8px' }} outlined severity="success" onClick={editTag} />
                            <Button key="2" icon="pi pi-trash" style={{ fontSize: '1rem', marginLeft: '6px' }} outlined severity="danger" onClick={removeTag} />
                            <Button key="3" icon="pi pi-times" style={{ fontSize: '1rem', marginLeft: '6px' }} outlined severity="secondary" onClick={clear} />
                        </>
                    )
                ))}
            </div>

            <div style={{ position: 'absolute', width: '100%', display: 'flex', 'justifyContent': 'center', 'bottom': '20px' }}>
                <Button label="Done" severity="secondary" onClick={onHide} />
            </div>
        </Dialog>

    );
};
