import Link from 'next/link';

export default async function mainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="navbar justify-center bg-base-200">
                <Link className="btn-ghost btn text-xl normal-case" href="/">
                    Slivki
                </Link>
            </div>
            {children}
        </>
    );
}
