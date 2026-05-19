/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  redirects: async () => [
    { source: "/produtos", destination: "/#por-onde-comecar", permanent: true },
  ],
};

export default nextConfig;
