'use client';

import { SimpleCategory } from '@/models/Category';
import { useEffect, useRef, useState } from 'react';
import { ItemEditable } from './ItemEditable';

export function CategoryEditable({ category }: { category: SimpleCategory }) {
    const nameFieldRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState(category.name_en);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateCategory = () => {
        if (nameFieldRef.current) {
            const newName = nameFieldRef.current.value.trim();
            if (newName !== name && newName !== '') {
                console.log(`Updating category from ${name} to ${newName}`);
                setLoading(true);
                fetch(`/api/category/${category._id}`, {
                    body: JSON.stringify({ name_en: newName }),
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                }).then(async (res) => {
                    setLoading(false);
                    if (res.status === 200) {
                        console.log('Category updated');
                        setName(newName);
                        fetch('/api/revalidate'); // Updating main page
                    } else {
                        console.error('Category update failed');
                    }
                });
            } else {
                nameFieldRef.current.value = name;
            }
        }
    };

    useEffect(() => {
        if (editing) nameFieldRef.current?.focus();
    }, [editing]);

    return (
        <div className="flex w-full flex-col items-center gap-4">
            <div className="divider">
                <span
                    role="button"
                    className={`text-center text-xl font-bold ${
                        (editing || loading) && 'hidden'
                    }`}
                    onClick={() => setEditing(true)}
                >
                    {name}
                </span>
                {loading && <progress className="progress w-56"></progress>}
                <input
                    type="text"
                    placeholder="Category title"
                    defaultValue={name}
                    ref={nameFieldRef}
                    onBlur={() => {
                        updateCategory();
                        setEditing(false);
                    }}
                    className={`input-ghost input text-center text-xl font-bold ${
                        !editing && 'hidden'
                    }`}
                />
            </div>
            {category.items &&
                category.items.map((item) => (
                    <ItemEditable item={item} key={item._id.toString()} />
                ))}
        </div>
    );
}
