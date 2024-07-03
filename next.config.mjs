/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        // remotePatterns: ["i.ytimg.com", "yt3.ggpht.com"],
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
