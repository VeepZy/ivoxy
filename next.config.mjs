/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
    },
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

export default nextConfig;
