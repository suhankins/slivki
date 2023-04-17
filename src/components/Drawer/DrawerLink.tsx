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
}

const indent = ['', 'ml-4', 'ml-8']; // We have to spell it out so tailwind detects it

export function DrawerLink({
    drawerInputId,
    header,
    depth = 0,
    className,
}: DrawerLinkProps) {
    return (
        <>
            <li>
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
            {header.innerHeaders &&
                header.innerHeaders.map((innerHeader, index) => (
                    <DrawerLink
                        drawerInputId={drawerInputId}
                        header={innerHeader}
                        depth={depth + 1}
                        key={index}
                    />
                ))}
        </>
    );
}
