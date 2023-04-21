import { ForwardedRef, HTMLAttributes, forwardRef, useEffect } from 'react';

export interface AutoResizableTextareaParams {
    allowNewLine?: boolean;
    props?: HTMLAttributes<HTMLTextAreaElement>;
}

export const AutoResizableTextarea = forwardRef(
    (
        { allowNewLine, ...props }: AutoResizableTextareaParams,
        ref: ForwardedRef<HTMLTextAreaElement>
    ) => {
        const resizeTextarea = (textarea: HTMLTextAreaElement) => {
            textarea.style.height = '0';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };

        useEffect(() => {
            if (!ref) return;
            if (typeof ref === 'function') return;
            resizeTextarea(ref.current as HTMLTextAreaElement);
        }, [ref]);

        return (
            <textarea
                {...props}
                ref={ref}
                onInput={(event) => {
                    const target = event.target as HTMLTextAreaElement;
                    if (!allowNewLine)
                        target.value = target.value.replace(/[\r\n\v]+/g, ''); // removing all new line symbols
                    resizeTextarea(target);
                }}
            />
        );
    }
);
