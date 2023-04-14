import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { HTMLAttributes } from 'react';

export function EllipsisMenu({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    props?: HTMLAttributes<HTMLDivElement>;
}) {
    return (
        <div className={`dropdown-end dropdown ${className ?? ''}`} {...props}>
            <label tabIndex={0} className="btn-ghost btn w-min">
                <EllipsisVerticalIcon className="absolute h-6 w-6" />
            </label>
            <ul className="dropdown-content menu rounded-box gap-1 bg-base-100 p-2 shadow">
                {children}
            </ul>
        </div>
    );
}
