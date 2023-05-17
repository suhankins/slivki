'use client';

import { scrollElementIntoView } from '@/utils/client/scrollElementIntoView';
import { Header } from './Header';
import { isBrowser } from '@/utils/client/isBrowser';
import { useMemo } from 'react';

export interface DrawerLinkProps {
    /**
     * Id of the input that controls the drawer, so buttons can close it when clicked
     */
    header: Header;
    /**
     * Depth of the header, used for indentation
     */
    depth?: number;
    className?: string;
    isStep?: boolean;
    drawerCheckboxRef?: React.RefObject<HTMLInputElement>;
}

const indent = ['', 'ml-4', 'ml-8', 'ml-12']; // We have to spell it out so tailwind detects it

export function DrawerLink({
    header,
    depth: paramDepth = 0,
    className,
    isStep = true,
    drawerCheckboxRef,
}: DrawerLinkProps) {
    const depth = header.depth ?? paramDepth;
    const element = useMemo(() => {
        if (!isBrowser()) return null;
        return document.getElementById(header.id);
    }, [header]);
    return (
        <li className={`${isStep ? 'step' : ''}`} data-content="">
            <button
                type="button"
                className={`btn-ghost btn justify-start ${indent[depth]} ${className}`}
                onClick={() => {
                    scrollElementIntoView(element);
                    drawerCheckboxRef?.current?.click();
                }}
            >
                {header.name}
            </button>
        </li>
    );
}
