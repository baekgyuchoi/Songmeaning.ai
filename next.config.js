/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: false,
    images: {
        domains: ['images.genius.com', 'images.rapgenius.com'],
        unoptimized: true,
    },
}

module.exports = nextConfig