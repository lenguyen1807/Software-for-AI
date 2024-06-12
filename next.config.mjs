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
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    rewrites: async () => {
        return [
        {
            source: "/api/:path*",
            destination:
            process.env.NODE_ENV === "development"
                ? "http://127.0.0.1:8000/api/:path*"
                : "/api/",
        },
        {
            source: "/docs",
            destination:
            process.env.NODE_ENV === "development"
                ? "http://127.0.0.1:8000/docs"
                : "/api/docs",
        },
        {
            source: "/openapi.json",
            destination:
            process.env.NODE_ENV === "development"
                ? "http://127.0.0.1:8000/openapi.json"
                : "/api/openapi.json",
        },
        ];
    },
};

export default nextConfig;