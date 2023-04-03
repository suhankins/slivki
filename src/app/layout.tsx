import './globals.scss';

export const metadata = {
    title: 'Slivki',
    description: 'Slivki coffee shop in Batumi, Georgia',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
