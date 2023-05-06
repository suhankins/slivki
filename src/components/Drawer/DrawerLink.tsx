'use client';

import { scrollElementIntoView } from '@/utils/client/scrollElementIntoView';
import { Header } from './Header';
import { isBrowser } from '@/utils/client/isBrowser';
import { useMemo } from 'react';

export interface DrawerLinkProps {
    /**
     * Id of the input that controls the drawer, so buttons can close it when clicked
     */
    drawerInputId: string;
    header: Header;
    /**
     * Depth of the header, used for indentation
     */
    depth?: number;
    className?: string;
    isStep?: boolean;
}

const indent = ['', 'ml-4', 'ml-8', 'ml-12']; // We have to spell it out so tailwind detects it

export function DrawerLink({
    drawerInputId,
    header,
    depth: paramDepth = 0,
    className,
    isStep = true,
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
                    document.getElementById(drawerInputId)?.click();
                }}
            >
                {header.name}
            </button>
        </li>
    );
}
