import Link from 'next/link';
import { Logout } from '@/components/Logout';

export const metadata = {
    title: 'Slivki admin panel',
    description: 'Slivki admin panel',
};

export default async function mainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="mx-auto flex max-w-screen-2xl flex-col items-center">
                <div className="navbar sticky top-0 z-40 gap-4 bg-base-100 px-4 shadow-lg">
                    <div className="flex-1">
                        <Link
                            href="/"
                            className="btn-ghost btn text-xl normal-case"
                        >
                            Slivki Admin panel
                        </Link>
                    </div>
                    <Logout />
                </div>
                <div className="max-w-screen-xl p-4">{children}</div>
            </div>
        </>
    );
}
