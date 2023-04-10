import { useMemo, useRef, useState } from 'react';
import { AutoResizableTextarea } from './AutoResizableTextarea';

export type EditableTextProps = {
    textarea?: boolean;
    className?: string;
    placeholder?: string;
    defaultValue?: string;
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
    /**
     * The id of the input field. Mainly for label htmlfor.
     */
    id?: string;
};

export function EditableText({
    textarea,
    className,
    placeholder,
    defaultValue,
    fetchUrl,
    valueName,
    shouldUpdateMainPage = true,
    type = 'text',
    id,
}: EditableTextProps) {
    const defaultRef = useRef(defaultValue);
    const fieldRef = useRef(null);
    const [loading, setLoading] = useState(false);

    function reset() {
        if (!fieldRef.current) return;
        (textarea
            ? (fieldRef.current as HTMLTextAreaElement)
            : (fieldRef.current as HTMLInputElement)
        ).value = defaultRef.current ?? '';
    }

    const updateCategory = () => {
        if (!fieldRef.current) return;

        const newValue = (
            textarea
                ? (fieldRef.current as HTMLTextAreaElement)
                : (fieldRef.current as HTMLInputElement)
        ).value.trim();

        if (newValue === '') {
            reset();
            return;
        }
        if (newValue !== defaultRef.current) {
            setLoading(true);
            fetch(fetchUrl, {
                body: JSON.stringify({ [valueName]: newValue }),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            }).then(async (res) => {
                setLoading(false);
                if (res.status === 200) {
                    defaultRef.current = newValue;
                    if (shouldUpdateMainPage) fetch('/api/revalidate');
                } else {
                    reset();
                }
            });
        }
    };

    const staticProps = useMemo(() => {
        return {
            id: id,
            ref: fieldRef,
            type: type,
            placeholder: placeholder,
            defaultValue: defaultValue,
            onBlur: () => updateCategory(),
            onKeyUp: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    updateCategory();
                }
            },
        };
    }, []);

    const dynamicProps = useMemo(() => {
        return {
            className: `${className ?? ''} ${loading && 'skeleton'}`,
            disabled: loading,
            'aria-busy': loading,
        };
    }, [loading, className]);

    return (
        <>
            {textarea ? (
                <AutoResizableTextarea {...staticProps} {...dynamicProps} />
            ) : (
                <input {...staticProps} {...dynamicProps} />
            )}
        </>
    );
}
