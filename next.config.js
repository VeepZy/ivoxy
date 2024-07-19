const withPWA = require("next-pwa");

const pwa = withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        remotePatterns: [
            {
                pathname: "/**",
                protocol: "https",
                hostname: "i.ytimg.com",
            },
            {
                pathname: "/**",
                protocol: "https",
                hostname: "yt3.ggpht.com",
            },
        ],
    },
};

module.exports = pwa(nextConfig);
