import withBundleAnalyzer from '@next/bundle-analyzer';

const bundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
                port: "",
                pathname: "**"
            }
        ]
    },
};

export default nextConfig;