'use client';

import Link from 'next/link';
import { DrawerLink } from './DrawerLink';
import { useId, useMemo, useRef } from 'react';
import { Header } from './Header';
import { Navbar } from '../Navbar';

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
    const drawerCheckboxRef = useRef<HTMLInputElement>(null);

    const headerList = useMemo(() => {
        const list: Header[] = [];
        let last: Header | null = null;
        headers?.forEach((header) => {
            if ((header.depth ?? 0) <= (last?.depth ?? 0)) {
                last = header;
                list.push(header);
            } else {
                if (!last) return;
                if (!last.children) last.children = [];
                last.children.push(header);
            }
        });
        console.log(list);
        return list;
    }, [headers]);

    return (
        <div className="drawer">
            <input
                ref={drawerCheckboxRef}
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
            <aside className="drawer-side z-40" aria-label="Table of contents">
                <label
                    htmlFor={drawerInputId}
                    className="drawer-overlay"
                ></label>
                <ul className="menu h-full w-60 gap-2 bg-base-100 p-4">
                    <DrawerLink
                        className="h-full text-2xl font-bold"
                        header={{
                            name: name ?? 'Slivki',
                            id: topId,
                        }}
                        drawerCheckboxRef={drawerCheckboxRef}
                    />
                    {headerList.map((header) => (
                        <DrawerLink
                            key={header.id}
                            header={header}
                            drawerCheckboxRef={drawerCheckboxRef}
                        />
                    ))}
                </ul>
            </aside>
        </div>
    );
}
