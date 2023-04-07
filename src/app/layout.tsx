import './globals.scss';

export const metadata = {
    title: 'Slivki',
    description: 'Slivki coffee shop in Batumi, Georgia',
    colorScheme: 'light',
    openGraph: {
        locale: 'en_US',
        siteName: 'Slivki',
        description: 'Slivki coffee shop in Batumi, Georgia',
        images: [
            // TODO: Add actual images
            'https://storage.googleapis.com/slivki_pictures-f3fd48a/latte.webp',
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
