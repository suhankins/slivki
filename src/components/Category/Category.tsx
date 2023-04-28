import { HTMLAttributes } from 'react';

export interface CategoryParams {
    title: React.ReactNode;
    children?: React.ReactNode;
    props?: HTMLAttributes<HTMLDivElement>;
    id?: string;
}

export function Category({ title, children, id, ...props }: CategoryParams) {
    return (
        <section className="flex w-full flex-col items-center gap-4" {...props}>
            <h2 className="divider">{title}</h2>
            {/* Div for scroll to things */}
            <div id={id} className="relative -top-32" />
            <div className="grid w-full grid-cols-2 gap-2">{children}</div>
        </section>
    );
}
