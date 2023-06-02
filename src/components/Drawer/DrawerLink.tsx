'use client';

import { scrollElementIntoView } from '@/utils/client/scrollElementIntoView';
import { Header } from './Header';
import { useEffect, useState } from 'react';

export interface DrawerLinkProps {
    /**
     * Id of the input that controls the drawer, so buttons can close it when clicked
     */
    header: Header;
    className?: string;
    drawerCheckboxRef?: React.RefObject<HTMLInputElement>;
}

export function DrawerLink({
    header,
    className,
    drawerCheckboxRef,
}: DrawerLinkProps) {
    const [element, setElement] = useState<HTMLElement | null>(null);
    useEffect(
        () => setElement(header.id ? document.getElementById(header.id) : null),
        [header]
    );
    return (
        <li>
            <button
                type="button"
                className={`justify-start text-lg font-semibold ${className}`}
                onClick={() => {
                    scrollElementIntoView(element);
                    drawerCheckboxRef?.current?.click();
                }}
            >
                {header.name}
            </button>
            {header.children && (
                <ul>
                    {header.children.map((child) => (
                        <DrawerLink
                            key={child.id}
                            header={child}
                            drawerCheckboxRef={drawerCheckboxRef}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}
