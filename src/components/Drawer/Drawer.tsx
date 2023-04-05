import Link from 'next/link';
import { DrawerLink } from './DrawerLink';

export interface Header {
    name: string;
    /**
     * Element id to scroll to
     */
    id: string;
}

export interface DrawerProps {
    children: React.ReactNode;
    navbarElements?: React.ReactNode;
    headers?: Header[];
    name?: string;
}

const drawerInputId = 'drawer';

export function Drawer({
    children,
    navbarElements,
    name,
    headers,
}: DrawerProps) {
    return (
        <div className="drawer">
            <input
                id={drawerInputId}
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content flex flex-col">
                <div className="navbar w-full bg-base-300">
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
                </div>
                <div className="mx-auto max-w-screen-lg p-4">{children}</div>
            </div>
            <nav className="drawer-side" aria-label="Table of contents">
                <label
                    htmlFor={drawerInputId}
                    className="drawer-overlay"
                ></label>
                <ul className="menu w-80 bg-base-100 p-4">
                    {headers?.map((header, index) => (
                        <li key={index}>
                            <DrawerLink
                                drawerInputId={drawerInputId}
                                name={header.name}
                                id={header.id}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}