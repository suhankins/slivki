import {
    Dispatch,
    HTMLInputTypeAttribute,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { AutoResizableTextarea } from './AutoResizableTextarea';
import { mutate } from 'swr';

export type HTMLTextField = HTMLInputElement & HTMLTextAreaElement;
export type HTMLTextFieldAttributes =
    React.InputHTMLAttributes<HTMLInputElement> &
        React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface EditableTextProps extends HTMLTextFieldAttributes {
    textarea?: boolean;
    className?: string;
    defaultValue?: string;
    setLoading?: Dispatch<SetStateAction<boolean>>;
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
    type?: HTMLInputTypeAttribute;
}

export function EditableText({
    textarea,
    className,
    defaultValue,
    fetchUrl,
    valueName = 'value',
    shouldUpdateMainPage = true,
    type = 'text',
    setLoading: setOutsideLoading,
    ...props
}: EditableTextProps) {
    const fieldRef = useRef<HTMLTextField>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => setOutsideLoading?.(loading), [loading]);

    function reset() {
        if (!fieldRef.current) return;
        fieldRef.current.value = defaultValue ?? '';
    }

    const updateCategory = useMemo(
        () => async () => {
            if (!fieldRef.current) return;

            const newValue = fieldRef.current.value.trim();

            if (newValue === '') {
                reset();
                return;
            }
            if (newValue !== defaultValue) {
                setLoading(true);
                const result = await fetch(fetchUrl, {
                    body: JSON.stringify({ [valueName]: newValue }),
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (result.status === 200) {
                    if (shouldUpdateMainPage) fetch('/api/revalidate');
                    await mutate('/api/category');
                } else {
                    reset();
                }
                setLoading(false);
            }
        },
        [fetchUrl, valueName, shouldUpdateMainPage]
    );

    const staticProps = useMemo(() => {
        return {
            defaultValue: defaultValue,
            ref: fieldRef,
            type: type,
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

    const handlers = useMemo(() => {
        return {
            onBlur: () => updateCategory(),
            onKeyUp: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    updateCategory();
                }
            },
        };
    }, [updateCategory]);

    useEffect(() => {
        if (!fieldRef.current || defaultValue === undefined) return;
        fieldRef.current.value = defaultValue;
    }, [defaultValue]);

    return (
        <>
            {textarea ? (
                <AutoResizableTextarea
                    {...staticProps}
                    {...dynamicProps}
                    {...handlers}
                />
            ) : (
                <input {...staticProps} {...dynamicProps} {...handlers} />
            )}
        </>
    );
}
