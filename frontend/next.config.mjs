/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/emails/:path*",
        destination: "http://localhost:3001/emails/:path*",
      },
    ];
  },
};

export default nextConfig;
