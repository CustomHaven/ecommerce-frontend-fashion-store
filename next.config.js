/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "ae01.alicdn.com"]
  },
  redirects: () => {
    return [
      {
        source: '/checkout',
        destination: '/',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig;
