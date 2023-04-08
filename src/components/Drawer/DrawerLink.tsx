'use client';

import { Header } from './Header';

export function DrawerLink({
    drawerInputId,
    name,
    id,
    innerHeaders,
}: {
    drawerInputId: string;
    name: string;
    id: string;
    innerHeaders?: Header[];
}) {
    return (
        <>
            <li>
                <a
                    className="btn-primary btn justify-start"
                    onClick={() => {
                        const element = document.getElementById(id);
                        element?.scrollIntoView(true);
                        document.getElementById(drawerInputId)?.click();
                    }}
                >
                    {name}
                </a>
            </li>
            {innerHeaders &&
                innerHeaders.map((innerHeader, index) => (
                    <li key={index}>
                        <a
                            className="btn-secondary btn mr-8 justify-start"
                            onClick={() => {
                                const element = document.getElementById(
                                    innerHeader.id
                                );
                                element?.scrollIntoView(true);
                                document.getElementById(drawerInputId)?.click();
                            }}
                        >
                            {innerHeader.name}
                        </a>
                    </li>
                ))}
        </>
    );
}
