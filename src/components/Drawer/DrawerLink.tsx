'use client';

import { scrollIdIntoView } from '@/utils/client/scrollIdIntoView';
import { Header } from './Header';

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
    return (
        <li className={`${isStep ? 'step' : ''}`} data-content="">
            <button
                type="button"
                className={`btn-ghost btn justify-start ${indent[depth]} ${className}`}
                onClick={() => {
                    scrollIdIntoView(header.id);
                    document.getElementById(drawerInputId)?.click();
                }}
            >
                {header.name}
            </button>
        </li>
    );
}
