import './globals.scss';

export const metadata = {
    title: 'Slivki',
    description: 'Slivki coffee shop in Batumi',
    colorScheme: 'light',
    metadataBase: new URL('https://slivki.vercel.app/'),
    openGraph: {
        locale: 'en_US',
        siteName: 'Slivki',
        title: 'Slivki',
        description: 'Slivki coffee shop in Batumi',
        images: [
            'https://storage.googleapis.com/slivki_pictures-f3fd48a/wo8ykowf.jpg',
        ],
    },
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
