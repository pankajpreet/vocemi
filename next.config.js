/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Dental was dropped in the Oct 2026 restructure. statusCode, not
      // permanent: true, which would send a 308.
      {
        source: "/industries/dental",
        destination: "/industries",
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;

