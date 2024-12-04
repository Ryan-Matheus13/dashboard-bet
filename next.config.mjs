/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.4play.bet",
      },
    ],
  },
  webpack: (config) => {
    const cssRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes(".css")
    );

    if (cssRule) {
      config.module.rules = [
        ...config.module.rules.filter((rule) => rule !== cssRule),
        cssRule,
      ];
    }

    return config;
  },
};

export default nextConfig;
