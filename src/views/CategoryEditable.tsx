import { CategoryClass } from '@/models/Category';
import { useRef, useState } from 'react';

export function CategoryEditable({ category }: { category: CategoryClass }) {
    const nameFieldRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef(category.name_en);
    const [loading, setLoading] = useState(false);

    const updateCategory = () => {
        if (nameFieldRef.current) {
            const newName = nameFieldRef.current.value.trim();
            if (newName !== nameRef.current && newName !== '') {
                console.log(
                    `Updating category from ${nameRef.current} to ${newName}`
                );
                setLoading(true);
                fetch(`/api/category/${category._id}`, {
                    body: JSON.stringify({ name_en: newName }),
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                }).then(async (res) => {
                    setLoading(false);
                    if (res.status === 200) {
                        console.log('Category updated');
                        nameRef.current = newName;
                    } else {
                        console.error('Category update failed');
                    }
                });
            } else {
                nameFieldRef.current.value = nameRef.current;
            }
        }
    };

    return (
        <>
            <div className="divider">
                <input
                    disabled={loading}
                    aria-busy={loading}
                    type="text"
                    placeholder="Category title"
                    defaultValue={category.name_en}
                    ref={nameFieldRef}
                    onBlur={updateCategory}
                    className="input-ghost input text-center text-xl font-bold"
                />
            </div>
        </>
    );
}
