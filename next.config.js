/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: `/${process.env.BUCKET_NAME}/**`,
            },
        ],
    },
};

module.exports = nextConfig;
