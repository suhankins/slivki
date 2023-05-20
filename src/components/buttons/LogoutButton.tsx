'use client';

import { signOut } from 'next-auth/react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

export interface LogoutProps {
    className?: string;
}

export function LogoutButton({ className }: LogoutProps) {
    return (
        <button
            aria-label="logout"
            type="button"
            className={`btn-ghost btn-square btn relative ${className}`}
            onClick={() => signOut()}
        >
            <ArrowLeftOnRectangleIcon className="absolute h-6 w-6" />
        </button>
    );
}
