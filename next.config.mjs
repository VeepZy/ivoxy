/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        domains: ["i.ytimg.com", "yt3.ggpht.com"],
    },
};

export default nextConfig;
