/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    images: {
        domains: ['images.genius.com', 'images.rapgenius.com'],
    },
}

module.exports = nextConfig