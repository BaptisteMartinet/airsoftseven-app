import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  redirects: async () => {
    return [
      {
        source: '/:path*',
        has: [
          { type: 'header', key: 'host', value: 'www.airsoftseven.com' },
          { type: 'header', key: 'host', value: 'airsoftseven.com' }
        ],
        destination: 'https://airsoftseven.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
