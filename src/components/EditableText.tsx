import { useRef, useState } from 'react';

export function EditableText({
    placeholder,
    defaultValue,
    fetchUrl,
    valueName,
}: {
    placeholder: string;
    defaultValue: string;
    fetchUrl: string;
    valueName: string;
}) {
    const fieldRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const updateCategory = () => {
        if (!fieldRef.current) return;
        const newValue = fieldRef.current.value.trim();
        if (newValue === '') {
            fieldRef.current.value = defaultValue;
            return;
        }
        if (newValue !== defaultValue) {
            setLoading(true);
            fetch(fetchUrl, {
                body: JSON.stringify({ [valueName]: newValue }),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            }).then(async (res) => {
                setLoading(false);
                if (res.status === 200) {
                    console.log('Category updated');
                    defaultValue = newValue;
                    fetch('/api/revalidate'); // Updating main page
                } else {
                    console.error('Category update failed');
                }
            });
        }
    };

    return (
        <input
            ref={fieldRef}
            type="text"
            disabled={loading}
            aria-busy={loading}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`input-ghost input text-center text-xl font-bold ${
                loading && 'skeleton'
            }`}
            onBlur={() => updateCategory()}
            onKeyUp={(e) => e.key === 'Enter' && updateCategory()}
        />
    );
}
