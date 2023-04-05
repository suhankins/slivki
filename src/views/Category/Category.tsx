import { HTMLAttributes } from 'react';

export interface CategoryParams {
    title: React.ReactNode;
    children?: React.ReactNode;
    props?: HTMLAttributes<HTMLDivElement>;
}

export function Category({ title, children, props }: CategoryParams) {
    return (
        <div className="flex w-full flex-col items-center gap-4" {...props}>
            <div className="divider">{title}</div>
            {children}
        </div>
    );
}
