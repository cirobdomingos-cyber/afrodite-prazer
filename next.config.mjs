/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  redirects: async () => [
    { source: "/produtos", destination: "/#cuidar", permanent: true },
    // O ebook só abre pelo link pessoal (/guia/ler); endereços antigos levam ao cadastro.
    { source: "/as-7-etapas", destination: "/guia", permanent: false },
    { source: "/as-7-etapas.html", destination: "/guia", permanent: false },
  ],
};

export default nextConfig;
