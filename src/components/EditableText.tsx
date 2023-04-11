import { useMemo, useRef, useState } from 'react';
import { AutoResizableTextarea } from './AutoResizableTextarea';

export type HTMLTextField = HTMLInputElement & HTMLTextAreaElement;
export type HTMLTextFieldAttributes =
    React.InputHTMLAttributes<HTMLInputElement> &
        React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface EditableTextProps extends HTMLTextFieldAttributes {
    textarea?: boolean;
    className?: string;
    defaultValue?: string;
    onInput?: (event: React.FormEvent<HTMLTextField>) => void;
    /**
     * The URL to fetch to update the value
     * @example '/api/category/1'
     */
    fetchUrl: string;
    /**
     * The name of the value in the request body
     * @example 'name_en'
     */
    valueName?: string;
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
}

export function EditableText({
    textarea,
    className,
    defaultValue,
    fetchUrl,
    valueName = 'value',
    shouldUpdateMainPage = true,
    type = 'text',
    ...props
}: EditableTextProps) {
    const defaultRef = useRef(defaultValue);
    const fieldRef = useRef<HTMLTextField>(null);
    const [loading, setLoading] = useState(false);

    function reset() {
        if (!fieldRef.current) return;
        fieldRef.current.value = defaultRef.current ?? '';
    }

    const updateCategory = () => {
        if (!fieldRef.current) return;

        const newValue = fieldRef.current.value.trim();

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
            ref: fieldRef,
            type: type,
            defaultValue: defaultValue,
            onBlur: () => updateCategory(),
            onKeyUp: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    updateCategory();
                }
            },
            ...props,
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
