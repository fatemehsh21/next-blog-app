/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog-app-backend-xzra.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
