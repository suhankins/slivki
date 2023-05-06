import Link from 'next/link';
import { DrawerLink } from './DrawerLink';
import { useId } from 'react';
import { Header } from './Header';
import { Navbar } from './Navbar';

export interface DrawerProps {
    children: React.ReactNode;
    navbarElements?: React.ReactNode;
    headers?: Header[];
    name?: string;
    navbarChangeOnScroll?: boolean;
}

export function Drawer({
    children,
    navbarElements,
    name,
    headers,
    navbarChangeOnScroll,
}: DrawerProps) {
    const drawerInputId = useId();
    const topId = useId();
    const drawerContentId = useId();
    return (
        <div className="drawer">
            <input
                id={drawerInputId}
                type="checkbox"
                className="drawer-toggle"
            />
            <div
                className="drawer-content flex flex-col items-center"
                id={drawerContentId}
            >
                <Navbar
                    parentId={drawerContentId}
                    changeOnScroll={navbarChangeOnScroll}
                >
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
                </Navbar>
                <div id={topId} className="absolute top-0 left-0" />
                {children}
            </div>
            <aside className="drawer-side" aria-label="Table of contents">
                <label
                    htmlFor={drawerInputId}
                    className="drawer-overlay"
                ></label>
                <ul className="w-60 gap-2 bg-base-100 p-4">
                    <DrawerLink
                        isStep={false}
                        className="h-full text-2xl font-bold"
                        drawerInputId={drawerInputId}
                        header={{
                            name: name ?? 'Slivki',
                            id: topId,
                        }}
                    />
                    <li>
                        <ul className="steps steps-vertical w-full overflow-x-hidden">
                            {headers?.map((header) => (
                                <DrawerLink
                                    key={header.id}
                                    drawerInputId={drawerInputId}
                                    header={header}
                                    className="w-full"
                                />
                            ))}
                        </ul>
                    </li>
                </ul>
            </aside>
        </div>
    );
}
