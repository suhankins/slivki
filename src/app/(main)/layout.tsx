export default async function mainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="navbar justify-center bg-base-200">
                <a className="btn-ghost btn text-xl normal-case">Slivki</a>
            </div>
            {children}
        </>
    );
}
