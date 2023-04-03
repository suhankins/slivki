import { useRef, useState } from 'react';

export type EditableTextProps = {
    placeholder: string;
    defaultValue: string;
    /**
     * The URL to fetch to update the value
     * @example '/api/category/1'
     */
    fetchUrl: string;
    /**
     * The name of the value in the request body
     * @example 'name_en'
     */
    valueName: string;
    /**
     * Should the page be revalidated after the text is updated?
     * @default true
     */
    shouldUpdateMainPage?: boolean;
    /**
     * The type of the input field
     * @default 'text'
     */
    type?: string;
};

export function EditableText({
    placeholder,
    defaultValue,
    fetchUrl,
    valueName,
    shouldUpdateMainPage = true,
    type = 'text',
}: EditableTextProps) {
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
                    defaultValue = newValue;
                    if (shouldUpdateMainPage) fetch('/api/revalidate');
                } else {
                    console.error(await res.text());
                }
            });
        }
    };

    return (
        <input
            ref={fieldRef}
            type={type}
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
