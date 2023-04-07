import { HTMLAttributes } from 'react';

export interface CategoryParams {
    title: React.ReactNode;
    children?: React.ReactNode;
    props?: HTMLAttributes<HTMLDivElement>;
}

export function Category({ title, children, props }: CategoryParams) {
    return (
        <section className="flex w-full flex-col items-center gap-4" {...props}>
            <h2 className="divider">{title}</h2>
            {children}
        </section>
    );
}
