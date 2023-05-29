import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function GoBackButton() {
    return (
        <Link className="btn-ghost btn-square btn" href="/">
            <ArrowLeftIcon className="absolute h-6 w-6" />
        </Link>
    );
}
