import Link from 'next/link';
import { DrawerLink } from './DrawerLink';
import { useId } from 'react';
import { Header } from './Header';

export interface DrawerProps {
    children: React.ReactNode;
    navbarElements?: React.ReactNode;
    headers?: Header[];
    name?: string;
}

export function Drawer({
    children,
    navbarElements,
    name,
    headers,
}: DrawerProps) {
    const drawerInputId = useId();
    const topId = useId();
    return (
        <div className="drawer">
            <input
                id={drawerInputId}
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content flex flex-col items-center">
                <nav className="navbar sticky top-0 left-0 z-40 bg-base-300">
                    <div className="flex-none">
                        <label
                            htmlFor={drawerInputId}
                            className="btn-ghost btn-square btn"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <Link
                        href="/"
                        className="btn-ghost btn text-xl normal-case"
                    >
                        {name ?? 'Slivki'}
                    </Link>
                    {navbarElements}
                </nav>
                <div id={topId} className="absolute top-0 left-0" />
                {children}
            </div>
            <aside className="drawer-side" aria-label="Table of contents">
                <label
                    htmlFor={drawerInputId}
                    className="drawer-overlay"
                ></label>
                <ul className="menu w-60 gap-2 bg-base-100 p-4">
                    <DrawerLink
                        className="h-full text-2xl font-bold"
                        drawerInputId={drawerInputId}
                        header={{
                            name: 'Slivki',
                            id: topId,
                        }}
                    />
                    {headers?.map((header) => (
                        <DrawerLink
                            key={header.id}
                            drawerInputId={drawerInputId}
                            header={header}
                        />
                    ))}
                </ul>
            </aside>
        </div>
    );
}
